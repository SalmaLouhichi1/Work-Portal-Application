import express from 'express';
import { getExpedition, updateExpedition, createExpedition, deleteExpedition, getexpeditionById } from '../controllers/Expedition.js';
import { checkRole } from '../utils/checkRole.js';
import { authenticateToken } from '../utils/authMiddleware.js';

const router = express.Router();

router.get('/expedition', authenticateToken ,getExpedition);
router.put('/expedition/:id',authenticateToken ,updateExpedition);
router.post("/createExpedition", authenticateToken ,createExpedition);
router.delete('/expedition/:id', authenticateToken ,deleteExpedition);
router.get("/expedition/:id", authenticateToken ,getexpeditionById);

export default router;
