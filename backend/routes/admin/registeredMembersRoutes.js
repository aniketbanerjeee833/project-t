


import express from "express";
import userAuth from "../../middleware/userAuth.js";
import adminAuth from "../../middleware/adminAuth.js";
import { getAllRegisteredMembers } from "../../controllers/admin/registeredMembersController.js";
const router=express.Router();

router.get("/all",userAuth,adminAuth,getAllRegisteredMembers);
export default router;