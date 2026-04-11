import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode";
import path from "path";
import fs from "fs";
// import { fileURLToPath } from "url";
import db from "../../config/db.js";

// 🔥 fix __dirname (ES module)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// ─────────────────────────────────────────────────────────────
// 🔥 Generate 6-digit code using UUID
// ─────────────────────────────────────────────────────────────
const generate6DigitFromUUID = () => {
  const uuid = uuidv4().replace(/-/g, "");
  const num = parseInt(uuid.substring(0, 12), 16);
  return String(num).slice(0, 6);
};

// ─────────────────────────────────────────────────────────────
// 🔥 Ensure unique code
// ─────────────────────────────────────────────────────────────
const generateUniqueCode = async (connection) => {
  let code, exists;

  do {
    code = generate6DigitFromUUID();

    const [rows] = await connection.query(
      "SELECT id FROM new_qr WHERE code = ?",
      [code]
    );

    exists = rows.length > 0;

  } while (exists);

  return code;
};

// ─────────────────────────────────────────────────────────────
// 🔥 CREATE QR CONTROLLER
// ─────────────────────────────────────────────────────────────
const createQR = async (req, res) => {
  let connection;

  try {
    connection = await db.getConnection();

    // ✅ 1. generate unique code
    const code = await generateUniqueCode(connection);

    // ✅ 2. encode code (for URL)
    const encodedCode = Buffer.from(code).toString("base64");

    // ✅ 3. React route (IMPORTANT FIX)
    const link = `http://localhost:5173/profile-details-qr/${encodedCode}`;

    // ✅ 4. ensure folder exists
    // const qrDir = path.join(__dirname, "../uploads/admin/qr");
const qrDir = path.join(process.cwd(), "uploads/admin/qr");
    if (!fs.existsSync(qrDir)) {
      fs.mkdirSync(qrDir, { recursive: true });
    }

    // ✅ 5. generate QR image
    const fileName = `${code}.png`;
    const filePath = path.join(qrDir, fileName);

    await QRCode.toFile(filePath, link, {
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });

    // ✅ 6. store public path (IMPORTANT FIX)
    const imageCol = `qr/${fileName}`;
    const today = new Date().toISOString().split("T")[0];

    // ✅ 7. insert into DB
    let result;

    try {
      [result] = await connection.query(
        `INSERT INTO new_qr 
          (code, link, image, status, status2, deliver, date1, date2, date3)
         VALUES (?, ?, ?, '0', '', 0, ?, '', '')`,
        [code, link, imageCol, today]
      );

    } catch (err) {
      // 🔥 retry if duplicate
      if (err.code === "ER_DUP_ENTRY") {

        const newCode = await generateUniqueCode(connection);

        const encodedCode2 = Buffer.from(newCode).toString("base64");
        const newLink = `https://tagway.co.in/profile/${encodedCode2}`;

        const newFileName = `${newCode}.png`;
        const newFilePath = path.join(qrDir, newFileName);

        await QRCode.toFile(newFilePath, newLink);

        const newImageCol = `qr/${newFileName}`;

        [result] = await connection.query(
          `INSERT INTO new_qr 
            (code, link, image, status, status2, deliver, date1, date2, date3)
           VALUES (?, ?, ?, '0', '', 0, ?, '', '')`,
          [newCode, newLink, newImageCol, today]
        );

        return res.status(201).json({
          success: true,
          message: "QR created (retry)",
          data: {
            id: result.insertId,
            code: newCode,
            link: newLink,
            image: newImageCol,
          },
        });
      }

      throw err;
    }

    // ✅ success response
    return res.status(201).json({
      success: true,
      message: "QR created successfully",
      data: {
        id: result.insertId,
        code,
        link,
        image: imageCol,
        status: "0",
        status2: "",
        deliver: 0,
        date1: today,
        date2: "0000-00-00",
        date3: "0000-00-00",
      },
    });

  } catch (err) {
    console.error("createQR error:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });

  } finally {
    if (connection) connection.release();
  }
};
const getAllQR = async (req, res) => {
  try {
    // query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";

    const offset = (page - 1) * limit;

    // 🔍 Search condition
    let searchQuery = "";
    let values = [];

    if (search) {
      searchQuery = `
        WHERE code LIKE ? 
        OR status LIKE ? 
        OR DATE_FORMAT(date1, '%Y-%m-%d') LIKE ?
      `;
      values = [`%${search}%`, `%${search}%`, `%${search}%`];
    }

    // 📦 Main data query
    const [rows] = await db.query(
      `
      SELECT 
        DATE_FORMAT(date1, '%Y-%m-%d') AS date1,
        DATE_FORMAT(date2, '%Y-%m-%d') AS date2,
        DATE_FORMAT(date3, '%Y-%m-%d') AS date3,
        id, code, link, image, status, status2, deliver
      FROM new_qr
      ${searchQuery}
      ORDER BY id DESC
      LIMIT ? OFFSET ?
      `,
      [...values, limit, offset]
    );

    // 🔢 Total count (for pagination)
    const [countResult] = await db.query(
      `
      SELECT COUNT(*) as total
      FROM new_qr
      ${searchQuery}
      `,
      values
    );

    const total = countResult[0].total;

    return res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        total,
       
        limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    });

  } catch (err) {
    console.error("getAllQR error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
export { createQR, getAllQR };