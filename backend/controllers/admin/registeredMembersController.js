import db from "../../config/db.js";



// const getAllRegisteredMembers = async (req, res) => {
//   let connection;

//   try {
//     connection = await db.getConnection();

//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 5;
//     const search = req.query.search || "";
//     const offset = (page - 1) * limit;

//     let searchQuery = "";
//     let values = [];

//     // 🔍 SEARCH (register + information)
//     if (search) {
//       searchQuery = `
//         AND (
//           r.mobile LIKE ? OR
//           OR r.name LIKE ? OR
//           DATE_FORMAT(r.date, '%Y-%m-%d') LIKE ? OR
//           i.name LIKE ? OR
//           i.phone LIKE ? OR
//           i.email LIKE ? OR
//           i.card_id LIKE ?
//         )
//       `;

//       const like = `%${search}%`;

//       values = [like, like, like, like, like, like, like];
//     }

//     // ✅ MAIN QUERY (ONLY USERS, DISTINCT to avoid duplicates)
//     const [users] = await connection.query(
//       `
//       SELECT DISTINCT 
//         r.id,
//         r.mobile,
//         r.name,
//         DATE_FORMAT(r.date, '%Y-%m-%d') AS date
//       FROM register r
//       LEFT JOIN information i ON r.id = i.register_id
//       WHERE 1=1
//       ${searchQuery}
//       ORDER BY r.id DESC
//       LIMIT ? OFFSET ?
//       `,
//       [...values, limit, offset]
//     );

//     // ✅ COUNT QUERY (IMPORTANT: DISTINCT)
//     const [countResult] = await connection.query(
//       `
//       SELECT COUNT( DISTINCT  r.id) AS total
//       FROM register r
//       LEFT JOIN information i ON r.id = i.register_id
//       WHERE 1=1
//       ${searchQuery}
//       `,
//       values
//     );

//     const total = countResult[0].total;

//     return res.json({
//       success: true,
//       data: users, // 🔥 still only users (profiles fetched separately)
//       pagination: {
//         total,
//         limit,
//         totalPages: Math.ceil(total / limit),
//         currentPage: page,
//       },
//     });

//   } catch (err) {
//     console.error("getAllRegisteredMembers error:", err);

//     return res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   } finally {
//     if (connection) connection.release();
//   }
// };

const getAllRegisteredMembers = async (req, res) => {
  let connection;

  try {
    connection = await db.getConnection();

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    const offset = (page - 1) * limit;

    let searchCondition = "";
    let values = [];

    if (search) {
      const like = `%${search}%`;

      searchCondition = `
        AND (
          r.mobile LIKE ? OR
          r.name LIKE ? OR
          DATE_FORMAT(r.date, '%Y-%m-%d') LIKE ? OR
          EXISTS (
            SELECT 1
            FROM information i
            WHERE i.register_id = r.id
            AND (
              i.name LIKE ? OR
              i.phone LIKE ? OR
              i.email LIKE ? OR
              i.card_id LIKE ?
            )
          )
        )
      `;

      values = [like, like, like, like, like, like, like];
    }

    // ✅ CTE Query
    const [users] = await connection.query(
      `
      WITH filtered_users AS (
        SELECT 
          r.id,
          r.mobile,
          r.name,
          DATE_FORMAT(r.date, '%Y-%m-%d') AS date
        FROM register r
        WHERE 1=1
        ${searchCondition}
      )

      SELECT *
      FROM filtered_users
      ORDER BY id DESC
      LIMIT ? OFFSET ?
      `,
      [...values, limit, offset]
    );

    // ✅ Count using same CTE logic
    const [countResult] = await connection.query(
      `
      WITH filtered_users AS (
        SELECT r.id
        FROM register r
        WHERE 1=1
        ${searchCondition}
      )

      SELECT COUNT(*) AS total FROM filtered_users
      `,
      values
    );

    const total = countResult[0].total;

    return res.json({
      success: true,
      data: users,
      pagination: {
        total,
        limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    });

  } catch (err) {
    console.error("getAllRegisteredMembers error:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  } finally {
    if (connection) connection.release();
  }
};
// const getAllRegisteredMembers = async (req, res) => {
//   let connection;
//   try {
//     connection = await db.getConnection();

//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 5;
//     const search = req.query.search || "";
//     const offset = (page - 1) * limit;

//     let searchQuery = "";
//     let values = [];

//     if (search) {
//       searchQuery = `
//         AND (
//           mobile LIKE ? OR
//           DATE_FORMAT(date, '%Y-%m-%d') LIKE ?
//         )
//       `;
//       values = [`%${search}%`, `%${search}%`];
//     }

//     const [users] = await connection.query(
//       `
//       SELECT id, mobile, DATE_FORMAT(date, '%Y-%m-%d') AS date
//       FROM register
//       WHERE 1=1
//       ${searchQuery}
//       ORDER BY id DESC
//       LIMIT ? OFFSET ?
//       `,
//       [...values, limit, offset]
//     );

//     const [countResult] = await connection.query(
//       `
//       SELECT COUNT(*) AS total
//       FROM register
//       WHERE 1=1
//       ${searchQuery}
//       `,
//       values
//     );

//     return res.json({
//       success: true,
//       data: users, // 👈 NO profiles here
//       pagination: {
//         total: countResult[0].total,
//         limit,
//         totalPages: Math.ceil(countResult[0].total / limit),
//         currentPage: page,
//       },
//     });

//   } catch (err) {
//     return res.status(500).json({ success: false, error: err.message });
//   } finally {
//     if (connection) connection.release();
//   }
// };

const getProfilesByUser = async (req, res) => {
  let connection;
  try {
    const { id } = req.params;

    connection = await db.getConnection();

    const [profiles] = await connection.query(
      `
      SELECT 
        id,
        name,
        phone,
        email,
        profile AS type,
        card_id
      FROM information
      WHERE register_id = ?
      `,
      [id]
    );

    return res.json({
      success: true,
      data: profiles,
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
// const getAllRegisteredMembers = async (req, res) => {
//   let connection;
//   try {
//     connection = await db.getConnection();

//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 5;
//     const search = req.query.search || "";
//     const offset = (page - 1) * limit;

//     let searchQuery = "";
//     let values = [];

//     if (search) {
//       searchQuery = `
//         AND (
//           mobile LIKE ? OR
//           DATE_FORMAT(date, '%Y-%m-%d') LIKE ?
//         )
//       `;
//       values = [`%${search}%`, `%${search}%`];
//     }

//     // ✅ STEP 1: Get paginated users only
//     const [users] = await connection.query(
//       `
//       SELECT id, mobile, DATE_FORMAT(date, '%Y-%m-%d') AS date
//       FROM register
//       WHERE 1=1
//       ${searchQuery}
//       ORDER BY id DESC
//       LIMIT ? OFFSET ?
//       `,
//       [...values, limit, offset]
//     );

//     if (users.length === 0) {
//       return res.json({
//         success: true,
//         data: [],
//         pagination: { total: 0, limit, totalPages: 0, currentPage: page },
//       });
//     }

//     // ✅ STEP 2: Get all profiles for those users
//     const userIds = users.map(u => u.id);

//     const [profiles] = await connection.query(
//       `
//       SELECT 
//         id,
//         register_id,
//         name,
//         phone,
//         email,
//         profile AS type,
//         card_id
//       FROM information
//       WHERE register_id IN (?)
//       `,
//       [userIds]
//     );

//     // ✅ GROUP PROFILES
//     const profileMap = {};
//     profiles.forEach(p => {
//       if (!profileMap[p.register_id]) {
//         profileMap[p.register_id] = [];
//       }
//       profileMap[p.register_id].push({
//         id: p.id,
//         name: p.name,
//         phone: p.phone,
//         email: p.email,
//         type: p.type,
//         card_id: p.card_id,
//       });
//     });

//     // ✅ FINAL MERGE
//     const finalData = users.map(user => ({
//       ...user,
//       profiles: profileMap[user.id] || []
//     }));

//     // ✅ COUNT
//     const [countResult] = await connection.query(
//       `
//       SELECT COUNT(*) AS total
//       FROM register
//       WHERE 1=1
//       ${searchQuery}
//       `,
//       values
//     );

//     const total = countResult[0].total;

//     return res.json({
//       success: true,
//       data: finalData,
//       pagination: {
//         total,
//         limit,
//         totalPages: Math.ceil(total / limit),
//         currentPage: page,
//       },
//     });

//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   } finally {
//     if (connection) connection.release();
//   }
// };

const assignTagToUser = async (req, res) => {
  let connection;
  try {
    const { id } = req.params;     // profile id
    const { code } = req.body;     // QR / tag code

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code is required",
      });
    }

    connection = await db.getConnection();
    await connection.beginTransaction();

    // 🔥 1. CHECK: QR already linked to another profile
    const [existing] = await connection.query(
      `SELECT id FROM information WHERE card_id = ? AND status = 1`,
      [code]
    );

    if (existing.length > 0) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: "This tag is already assigned to another user",
      });
    }

    // 🔥 2. CHECK: QR exists + get date
    const [qrData] = await connection.query(
      `SELECT date1, status FROM new_qr WHERE code = ?`,
      [code]
    );

    if (qrData.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: "Tag not found",
      });
    }

   

    const qrDate = qrData[0].date1;

    // 🔥 3. UPDATE QR status
    await connection.query(
      `UPDATE new_qr SET status = 1 WHERE code = ?`,
      [code]
    );

    // 🔥 4. UPDATE information (assign tag)
    const [updateInfo] = await connection.query(
      `UPDATE information 
       SET card_id = ?, date = ? 
       WHERE id = ?`,
      [code, qrDate, id]
    );

    if (updateInfo.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    await connection.commit();

    return res.status(200).json({
      success: true,
      message: "Tag assigned successfully",
    });

  } catch (err) {
    if (connection) await connection.rollback();

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        message: "This tag is already assigned",
      });
    }

    console.error("assignTagToUser error:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  } finally {
    if (connection) connection.release();
  }
};

const disableAssignedTagToUser = async (req, res) => {
  let connection;
  try {
    const { id } = req.params;
    const { card_id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
      });
    }

    if (!card_id) {
      return res.status(400).json({
        success: false,
        message: "Tag Id is required",
      });
    }

    connection = await db.getConnection();
    await connection.beginTransaction();

    // 🔥 run both queries
    const [infoResult, qrResult] = await Promise.all([
      connection.query(
        "UPDATE information SET card_id = NULL WHERE id = ? AND card_id = ?",
        [id, card_id]
      ),
      connection.query(
        "UPDATE new_qr SET status = 0 WHERE code = ?",
        [card_id]
      ),
    ]);

    // ✅ check if update actually happened
    if (infoResult[0].affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: "Tag not found or already removed",
      });
    }

    await connection.commit();

    return res.status(200).json({
      success: true,
      message: "Tag disabled successfully",
    });

  } catch (err) {
    if (connection) await connection.rollback();

    console.error("deleteAssignedTag error:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  } finally {
    if (connection) connection.release();
  }
};


const deleteRegisteredMember = async (req, res) => {
  let connection;

  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
      });
    }

    connection = await db.getConnection();
    await connection.beginTransaction();

    // 🔥 1. Get profile + card_id in one query
    const [profile] = await connection.query(
      `SELECT id, card_id FROM information WHERE id = ?`,
      [id]
    );

    if (profile.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const cardId = profile[0].card_id;

    // 🔥 2. Delete child records (parallel safe inside transaction)
    await Promise.all([
      connection.query(`DELETE FROM allergies WHERE information_id = ?`, [id]),
      connection.query(`DELETE FROM medicine WHERE information_id = ?`, [id]),
      connection.query(`DELETE FROM health_insurance WHERE information_id = ?`, [id]),
      connection.query(`DELETE FROM vital_medical WHERE information_id = ?`, [id]),
      connection.query(`DELETE FROM emergency_contact WHERE information_id = ?`, [id]),
    ]);

    // 🔥 3. Reset QR if exists
    if (cardId) {
      await connection.query(
        `UPDATE new_qr SET status = 0 WHERE code = ?`,
        [cardId]
      );
    }

    // 🔥 4. Delete main profile
    await connection.query(`DELETE FROM information WHERE id = ?`, [id]);

    await connection.commit();

    return res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });

  } catch (err) {
    if (connection) await connection.rollback();

    console.error("deleteRegisteredMember error:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  } finally {
    if (connection) connection.release();
  }
};

// const customersRegisterdButTagNotPurchased=async(req,res)=>{
//     try {
//     connection = await db.getConnection();

//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 5;
//     const search = req.query.search || "";
//     const offset = (page - 1) * limit;

//     let searchCondition = "";
//     let values = [];

//     if (search) {
//       const like = `%${search}%`;

//       searchCondition = `
//         AND (
//           r.mobile LIKE ? OR
//           r.name LIKE ? OR
//           DATE_FORMAT(r.date, '%Y-%m-%d') LIKE ? OR
//           EXISTS (
//             SELECT 1
//             FROM information i
//             WHERE i.register_id = r.id
//             AND (
//               i.name LIKE ? OR
//               i.phone LIKE ? OR
//               i.email LIKE ? OR
//               i.card_id LIKE ?
//             )
//           )
//         )
//       `;

//       values = [like, like, like, like, like, like, like];
//     }

//     // ✅ CTE Query
//     const [users] = await connection.query(
//       `
//    WITH filtered_users AS (
//   SELECT r.id
//   FROM register r
//   INNER JOIN information i ON r.id = i.register_id
//   WHERE 1=1
//   ${searchCondition}
//   AND i.card_id IS NOT NULL
// )

//       SELECT *
//       FROM filtered_users
//       ORDER BY id DESC
//       LIMIT ? OFFSET ?
//       `,
//       [...values, limit, offset]
//     );

//     // ✅ Count using same CTE logic
//     const [countResult] = await connection.query(
//       `
//       WITH filtered_users AS (
//         SELECT r.id
//         FROM register r
//         WHERE 1=1
//         ${searchCondition}
//       )

//       SELECT COUNT(*) AS total FROM filtered_users
//       `,
//       values
//     );

//     const total = countResult[0].total;

//     return res.json({
//       success: true,
//       data: users,
//       pagination: {
//         total,
//         limit,
//         totalPages: Math.ceil(total / limit),
//         currentPage: page,
//       },
//     });

//   } catch (err) {
//     console.error("getAllRegisteredMembers error:", err);

//     return res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   } finally {
//     if (connection) connection.release();
//   }
// }
// const customersHavingProfileButNoEmergencyContact = async (req, res) => {
//   let connection;

//   try {
//     connection = await db.getConnection();

//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 5;
//     const search = req.query.search || "";
//     const offset = (page - 1) * limit;

//     let searchCondition = "";
//     let values = [];

//     // 🔍 Search logic
//     if (search) {
//       const like = `%${search}%`;

//       searchCondition = `
//         AND (
//           r.mobile LIKE ? OR
//           r.name LIKE ? OR
//           DATE_FORMAT(r.date, '%Y-%m-%d') LIKE ? OR
//           i.name LIKE ? OR
//           i.phone LIKE ? OR
//           i.email LIKE ? OR
//           i.card_id LIKE ?
//         )
//       `;

//       values = [like, like, like, like, like, like, like];
//     }

//     // ✅ MAIN QUERY (correct logic)
//     const [users] = await connection.query(
//       `
//       WITH filtered_profiles AS (
//   SELECT 
//     r.id AS register_id,
//     r.name AS register_name,
//     r.mobile,
//     i.id AS information_id,
//     i.name AS profile_name,
//     i.phone,
//     i.email,
//     DATE_FORMAT(r.date, '%Y-%m-%d') AS date
//   FROM register r
//   INNER JOIN information i 
//     ON r.id = i.register_id   

//   LEFT JOIN emergency_contact ec 
//     ON i.id = ec.information_id

//   WHERE ec.id IS NULL        
//   ${searchCondition}
// )

// SELECT *
// FROM filtered_profiles
// ORDER BY register_id DESC
// LIMIT ? OFFSET ?
//       `,
//       [...values, limit, offset]
//     );

//     // ✅ COUNT QUERY (must match EXACT logic)
//     const [countResult] = await connection.query(
//       `
//     WITH filtered_profiles AS (
//   SELECT i.id
//   FROM register r
//   INNER JOIN information i 
//     ON r.id = i.register_id

//   LEFT JOIN emergency_contact ec 
//     ON i.id = ec.information_id

//   WHERE ec.id IS NULL
//   ${searchCondition}
// )

// SELECT COUNT(*) AS total FROM filtered_profiles
//       `,
//       values
//     );

//     const total = countResult[0].total;

//     return res.json({
//       success: true,
//       data: users,
//       pagination: {
//         total,
//         limit,
//         totalPages: Math.ceil(total / limit),
//         currentPage: page,
//       },
//     });

//   } catch (err) {
//     console.error("customersHavingProfileButNoEmergencyContact error:", err);

//     return res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   } finally {
//     if (connection) connection.release();
//   }
// };

// const customersHavingProfileButNoEmergencyContact = async (req, res) => {
//   let connection;

//   try {
//     connection = await db.getConnection();

//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 5;
//     const search = req.query.search || "";
//     const offset = (page - 1) * limit;

//     let searchCondition = "";
//     let values = [];

//     // 🔍 Search logic
//     if (search) {
//       const like = `%${search}%`;

//       searchCondition = `
//         AND (
//           r.mobile LIKE ? OR
//           r.name LIKE ? OR
//           DATE_FORMAT(r.date, '%Y-%m-%d') LIKE ? OR
//           i.name LIKE ? OR
//           i.phone LIKE ? OR
//           i.email LIKE ? OR
//           i.card_id LIKE ?
//         )
//       `;

//       values = [like, like, like, like, like, like, like];
//     }

//     // ✅ MAIN QUERY (correct logic)
//     const [users] = await connection.query(
//       `
//       WITH filtered_profiles AS (
//   SELECT 
//     r.id AS register_id,
//     r.name AS register_name,
//     r.mobile,
//     i.id AS information_id,
//     i.name AS profile_name,
//     i.phone,
//     i.email,
//     DATE_FORMAT(r.date, '%Y-%m-%d') AS date
//   FROM register r
//   INNER JOIN information i 
//     ON r.id = i.register_id   

//   LEFT JOIN emergency_contact ec 
//     ON i.id = ec.information_id

//   WHERE ec.id IS NULL        
//   ${searchCondition}
// )

// SELECT *
// FROM filtered_profiles
// ORDER BY register_id DESC
// LIMIT ? OFFSET ?
//       `,
//       [...values, limit, offset]
//     );

//     // ✅ COUNT QUERY (must match EXACT logic)
//     const [countResult] = await connection.query(
//       `
//     WITH filtered_profiles AS (
//   SELECT i.id
//   FROM register r
//   INNER JOIN information i 
//     ON r.id = i.register_id

//   LEFT JOIN emergency_contact ec 
//     ON i.id = ec.information_id

//   WHERE ec.id IS NULL
//   ${searchCondition}
// )

// SELECT COUNT(*) AS total FROM filtered_profiles
//       `,
//       values
//     );

//     const total = countResult[0].total;

//     return res.json({
//       success: true,
//       data: users,
//       pagination: {
//         total,
//         limit,
//         totalPages: Math.ceil(total / limit),
//         currentPage: page,
//       },
//     });

//   } catch (err) {
//     console.error("customersHavingProfileButNoEmergencyContact error:", err);

//     return res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   } finally {
//     if (connection) connection.release();
//   }
// };
export { getAllRegisteredMembers, getProfilesByUser, assignTagToUser, disableAssignedTagToUser,
   deleteRegisteredMember };