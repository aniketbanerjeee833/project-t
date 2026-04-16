import db from "../config/db.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
 const safe= (val) => val ?? "";
// Add User
// Get Users

const isProduction=false


const registerUser = async (req, res, next) => {
  let connection;

  try {
    /* ---------------- BODY SAFETY ---------------- */
    // if (!req.body || Object.keys(req.body).length === 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Request body is required",
    //   });
    // }

    const { mobile, password } = req.body;

    // ✅ Basic validation
    if (!mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "Mobile and password are required",
      });
    }

     connection = await db.getConnection();
    await connection.beginTransaction();

    /* ---------------- DUPLICATE CHECK ---------------- */
    const [existing] = await connection.query(
      `SELECT id FROM register WHERE mobile = ? LIMIT 1`,
      [mobile]
    );

    if (existing.length) {
    
      return res.status(400).json({
        success: false,
        message: "Already registered",
      });
    }
   

    /* ---------------- HASH PASSWORD ---------------- */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* ---------------- INSERT USER ---------------- */
    await connection.query(
      `INSERT INTO register
       (mobile, password,  date)
       VALUES (?, ?,  NOW())`,
      [
        mobile,
        hashedPassword,
   
      ]
    );

    await connection.commit();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (err) {
    if (connection) await connection.rollback();
    console.error("Register Error:", err);
    //next(err);
  } finally {
    if (connection) connection.release();
  }
};

const loginUser = async (req, res, next) => {
  try {
     

    

    const { mobile, password } = req.body;
    //const ip = req.ip;

    // 🔹 1️⃣ Find user
    const [users] = await db.query(`SELECT * FROM register WHERE mobile = ?`, [mobile]);
    const user = users[0];
    if(!user){
      return res.status(401).json({ success: false, message: "User not exists, please register" });
    }

    // ❌ Invalid username
  //   if (!user || user.username !== username) {
  //     const attempt = await recordFailedAttempt(null, ip);
  //     if (attempt?.blocked_until_ms && attempt.blocked_until_ms > Date.now()) {
  //       const remaining = Math.ceil((attempt.blocked_until_ms - Date.now()) / 60000);
  //       return res.status(429).json({
  //         success: false,
  //         message: `Too many login attempts. Please try again after ${remaining} minutes.`,
  //         blockedUntil: attempt.blocked_until_ms,
  //         blockedUntilReadable: attempt.blocked_until,
  //       });
  //     }

  //     return res.status(401).json({
  //       success: false,
  //       message: "Invalid username",
  //       attempt,
  //     });
  //   }

  //   // 🔹 2️⃣ Check if user is blocked
  //   const [attemptRows] = await db.query(
  //     `SELECT * FROM admin_login_attempts WHERE User_Id = ? OR ip_address = ? LIMIT 1`,
  //     [user.User_Id, ip]
  //   );

  //   const attempt = attemptRows[0];
  //   const now = Date.now();

  //   if (attempt && attempt.blocked_until_ms && attempt.blocked_until_ms > now) {
  //     const remaining = Math.ceil((attempt.blocked_until_ms - now) / 60000);
  //     return res.status(429).json({
  //       success: false,
  //       message: `Too many login attempts. Please try again after ${remaining} minutes.`,
  //       blockedUntil: attempt.blocked_until_ms,
  //       blockedUntilReadable: attempt.blocked_until,
  //     });
  //   }


  // await db.query(`DELETE FROM admin_sessions WHERE User_Id = ? AND expires_at <= NOW()`, [user.User_Id]);

  //   // 🔹 4️⃣ Check if any active session still exists
  //   const [existingSessions] = await db.query(
  //     `SELECT * FROM admin_sessions WHERE User_Id = ? AND expires_at > NOW()`,
  //     [user.User_Id]
  //   );

  //   if (existingSessions.length > 0) {
  //     return res.status(403).json({
  //       success: false,
  //       message:
  //         "You are already logged in on another device. Please log out there to continue.",
  //     });
  //   }

    // 🔹 Validate password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
 

      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    // 🔹  Success — clear failed attempts

    // 🔹  Create new session
    const sessionId = crypto.randomBytes(32).toString("hex");
    // await db.query(
    //   `INSERT INTO admin_sessions (Session_Id, User_Id, created_at, expires_at)
    //    VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY))`,
    //   [sessionId, user.User_Id]
    // );

    // 🔹  Set secure cookie
    res.cookie("session_id", sessionId, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "Lax",
      path: "/"
       
    });

// let categories = [];

// if (user.role === "kitchen-staff") {
//   const [rows] = await db.query(
//     `SELECT Category_Names
//      FROM kitchen_staff_categories
//      WHERE User_Id = ?`,
//     [user.User_Id]
//   );

//   categories = rows.map((r) => r.Category_Names);
// }

    // 🔹 Respond success
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        mobile: user.mobile
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ success: false, message: "An error occurred during login" });
   //next(err);
  }
};


const logoutUser = async (req, res,next) => {
  try {
    //const sessionId = req.cookies.session_id;
    // if (sessionId) {
    //   await db.query(`DELETE FROM admin_sessions WHERE Session_Id = ?`, [sessionId]);
    // }

    res.clearCookie("session_id", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      path: "/"
    });

    return res.status(200).json({ success: true, message: "Logout successful" });
  } catch (err) {
    console.error("Logout error:", err);
 //next(err);
  
  }
};

//ADMIN


const addContactUs=async(req,res,next)=>{
  let connection;
  try{
    const {name,email,ph,message}=req.body;
    if(!name) return res.status(400).json({ success: false, message: "name required" });
    if(!email) return res.status(400).json({ success: false, message: "email required" });
   
    connection=await db.getConnection();
    await connection.beginTransaction();
    const [results]=await db.query(`INSERT INTO contact (name,email,ph,comment)VALUES(?,?,?,?)`,
      [safe(name),safe(email),safe(ph),safe(message)]);
    await connection.commit();
    return res.status(200).json({ success: true, message: "Contact us added",id:results.insertId });
  }
  catch(err){
    return res.status(500).json({ success: false, error: err.message });
  }finally{
    if(connection)connection.release();
  }
}
export {registerUser,loginUser,logoutUser,addContactUs };