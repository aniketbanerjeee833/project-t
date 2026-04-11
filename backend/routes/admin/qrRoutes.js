import express from "express";



import userAuth from "../../middleware/userAuth.js";
import adminAuth from "../../middleware/adminAuth.js";
import { createQR, getAllQR } from "../../controllers/admin/QrController.js";

const router = express.Router();

router.post("/create",userAuth,adminAuth,createQR);
router.get("/all",userAuth,adminAuth,getAllQR);

export default router;