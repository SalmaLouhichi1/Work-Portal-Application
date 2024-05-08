import express from "express";
import { getAdmins, getSuperAdmins } from "../controllers/management.js";

const router = express.Router();

router.get("/admins", getAdmins);
router.get("/superadmins", getSuperAdmins);

export default router;