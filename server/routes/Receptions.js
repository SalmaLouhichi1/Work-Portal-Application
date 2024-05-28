import express from 'express';
import { createReception, getReceptions, deleteReception, updateReceptions, getReceptionById } from '../controllers/Receptions.js';
import { checkRole } from '../utils/checkRole.js';
import { authenticateToken } from '../utils/authMiddleware.js';

const router = express.Router();

router.get('/receptions', authenticateToken, checkRole('TLS admin') ,getReceptions);
router.post("/createReception", authenticateToken,checkRole('TLS admin') ,createReception);
router.delete("/receptions/:id", authenticateToken,checkRole('TLS admin') ,deleteReception);
router.put("/receptions/:id", authenticateToken,checkRole('TLS admin') ,updateReceptions);
router.get("/receptions/:id", authenticateToken,checkRole('TLS admin') ,getReceptionById);

export default router;
