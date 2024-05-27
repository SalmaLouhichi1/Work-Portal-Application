import express from "express";
import { getUserById } from "../controllers/Authenticator.js"; 
import { authenticateToken } from "../utils/authMiddleware.js";

const router = express.Router();

router.get("/user", authenticateToken, getUserById);

export default router; 
