


import express from "express";
import userAuth from "../../middleware/userAuth.js";
import adminAuth from "../../middleware/adminAuth.js";
import { assignTagToUser, deleteRegisteredMember, disableAssignedTagToUser, getAllRegisteredMembers, getProfilesByUser } from "../../controllers/admin/registeredMembersController.js";
const router=express.Router();

router.get("/all",userAuth,adminAuth,getAllRegisteredMembers);
router.get("/profile/:id",userAuth,adminAuth,getProfilesByUser);
router.patch("/assign-tag/:id",userAuth,adminAuth,assignTagToUser);
router.patch("/assign-tag/disable/:id",userAuth,adminAuth,disableAssignedTagToUser);
router.delete("/delete/profile/:id",userAuth,adminAuth,deleteRegisteredMember);

export default router;