import express from "express";
import { deleteUser, getSewingContractor, getTLSAdmins, getUserPerformance, getWashingContractor, updateUser } from "../controllers/management.js";
import { checkRole } from "../utils/checkRole.js";
import { authenticateToken } from "../utils/authMiddleware.js";

const router = express.Router();

router.get("/tlsadmin", authenticateToken, getTLSAdmins);
router.get("/sewingcontractor", authenticateToken,getSewingContractor);
router.get("/washingcontractor", authenticateToken,getWashingContractor);
router.get("/performance/:id", authenticateToken,getUserPerformance);
router.delete("/user/:id", authenticateToken,deleteUser);
router.put("/user/:id", authenticateToken,updateUser);

export default router;