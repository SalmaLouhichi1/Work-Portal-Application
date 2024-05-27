import express from "express";
import { deleteUser, getSewingContractor, getTLSAdmins, getUserPerformance, getWashingContractor, updateUser } from "../controllers/management.js";

const router = express.Router();

router.get("/tlsadmin", getTLSAdmins);
router.get("/sewingcontractor", getSewingContractor);
router.get("/washingcontractor", getWashingContractor);
router.get("/performance/:id", getUserPerformance);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);

export default router;