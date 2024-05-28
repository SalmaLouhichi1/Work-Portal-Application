import express from "express";
import {addUser} from "../controllers/addUser.js";
import { checkRole } from "../utils/checkRole.js";
import { authenticateToken } from "../utils/authMiddleware.js";

const router = express.Router();

router.post("/adduser", authenticateToken,checkRole('TLS admin'), addUser);

export default router;