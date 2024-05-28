import express from "express";
import { deleteUser, getSewingContractor, getTLSAdmins, getUserPerformance, getWashingContractor, updateUser } from "../controllers/management.js";
import { checkRole } from "../utils/checkRole.js";
import { authenticateToken } from "../utils/authMiddleware.js";

const router = express.Router();

router.get("/tlsadmin", authenticateToken,checkRole('TLS admin'), getTLSAdmins);
router.get("/sewingcontractor", authenticateToken,checkRole('TLS admin'),getSewingContractor);
router.get("/washingcontractor", authenticateToken,checkRole('TLS admin'),getWashingContractor);
router.get("/performance/:id", authenticateToken,checkRole('TLS admin'),getUserPerformance);
router.delete("/user/:id", authenticateToken,checkRole('TLS admin'),deleteUser);
router.put("/user/:id", authenticateToken,checkRole('TLS admin'),updateUser);

export default router;