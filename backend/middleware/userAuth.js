
import db from "../config/db.js";


// Promise-based version of userAuth middleware
// const userAuth = async (req, res, next) => {
//   try {
//    const sessionId = req.cookies.admin_session_id;
//     // console.log("Auth middleware - checking session:", sessionId);

//     if (!sessionId) {
//       console.log("No session ID provided");
  
//       return res.status(401).json({ success: false, message: "Authentication required" });
//     }

    

//     // ✅ Using mysql2/promise (if your db connection is mysql2)
//     const [results] = await db.query(
//         `
//         SELECT 
         
        
          
//           u.name, 
        
//           u.username, 
//           u.role
          
//         FROM admin_sessions us
//         JOIN admin u ON us.User_Id = u.id
//         WHERE us.Session_Id = ? 
//           AND us.expires_at > NOW()
//       `,
//         [sessionId]
//       );

//     if (results.length === 0) {
//       console.log("Invalid or expired session");
      
//       return res.status(401).json({ success: false, message: "Invalid session or you are logged in on another device" });
//     }
// const [activeSessions] = await db.query(
//   "SELECT COUNT(*) AS cnt FROM admin_sessions WHERE User_Id = ? AND expires_at > NOW()",
//   [results[0].User_Id]
// );

// if (activeSessions[0].cnt > 1) {
//   console.warn(`⚠️ Multiple active sessions for user ${results[0].username}`);
//   return res
//     .status(403)
//     .json({ success: false, message: "You are already logged in on another device. Please log out there to continue." });
// }
//     // ✅ Attach user details to request
     

   
//     req.user = {
//       User_Id: results[0].User_Id,
//       name: results[0].name,
//       username: results[0].username,
//       role: results[0].role,
      
//     };
//     console.log(
//       `✅ Authenticated user: ${req.user.username} (${req.user.User_Id}) | Role: ${req.user.role}`
//     );

//     next(); // Continue to controller

//   } catch (err) {
//     console.error("❌ Session validation error:", err);
  
//  next(err);
//   }
// };
const userAuth = async (req, res, next) => {
  try {
    const sessionId = req.cookies.admin_session_id;

    if (!sessionId) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const [results] = await db.query(`
      SELECT 
        us.User_Id,
        u.name, 
        u.username, 
        u.role
      FROM admin_sessions us
      JOIN admin u ON us.User_Id = u.id
      WHERE us.Session_Id = ? 
        AND us.expires_at > NOW()
    `, [sessionId]);

    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired session"
      });
    }

    req.user = {
      User_Id: results[0].User_Id,
      name: results[0].name,
      username: results[0].username,
      role: results[0].role,
    };

    next();

  } catch (err) {
    console.error("❌ Session validation error:", err);
    next(err);
  }
};

export default userAuth;
