import express from 'express';
import { getExpedition, updateExpedition, createExpedition, deleteExpedition, getexpeditionById } from '../controllers/Expedition.js';
import { checkRole } from '../utils/checkRole.js';
import { authenticateToken } from '../utils/authMiddleware.js';

const router = express.Router();

router.get('/expedition', authenticateToken,checkRole('TLS admin', 'Sewing Contractor') ,getExpedition);
router.put('/expedition/:id',authenticateToken, checkRole('TLS admin', 'Sewing Contractor') ,updateExpedition);
router.post("/createExpedition", authenticateToken,checkRole('TLS admin', 'Sewing Contractor') ,createExpedition);
router.delete('/expedition/:id', authenticateToken,checkRole('TLS admin', 'Sewing Contractor') ,deleteExpedition);
router.get("/expedition/:id", authenticateToken,checkRole('TLS admin', 'Sewing Contractor') ,getexpeditionById);

export default router;
