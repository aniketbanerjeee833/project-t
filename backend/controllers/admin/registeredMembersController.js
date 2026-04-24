import db from "../../config/db.js";

const getAllRegisteredMembers = async (req, res) => {
  let connection;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";

    const offset = (page - 1) * limit;

    let searchQuery = "";
    let values = [];

    // 🔍 search
    if (search) {
      searchQuery = `
        AND (
          name LIKE ? OR
          phone LIKE ? OR
          card_id LIKE ? OR
          date LIKE ?
        )
      `;
      values = [
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
      ];
    }

    connection = await db.getConnection();

    // ✅ MAIN QUERY
    const [rows] = await connection.query(
      `
      SELECT id, name, phone, card_id, DATE_FORMAT(date, '%Y-%m-%d ') AS date
      FROM information
      WHERE card_id IS NOT NULL   -- 🔥 your condition
      ${searchQuery}
      ORDER BY id DESC
      LIMIT ? OFFSET ?
      `,
      [...values, limit, offset]
    );

    // ✅ COUNT QUERY
    const [countResult] = await connection.query(
      `
      SELECT COUNT(*) AS total
      FROM information
      WHERE card_id IS NOT NULL
      ${searchQuery}
      `,
      values
    );

    const total = countResult[0].total;

    return res.json({
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
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  } finally {
    if (connection) connection.release();
  }
};
export { getAllRegisteredMembers }