import express from 'express';
import { getExpedition, updateExpedition, createExpedition, deleteExpedition, getexpeditionById } from '../controllers/Expedition.js';
import { checkRole } from '../utils/checkRole.js';
import { authenticateToken } from '../utils/authMiddleware.js';

const router = express.Router();

router.get('/expedition', authenticateToken, checkRole('Sewing Contractor') ,getExpedition);
router.put('/expedition/:id',authenticateToken ,checkRole('Sewing Contractor') ,updateExpedition);
router.post("/createExpedition", authenticateToken ,checkRole('Sewing Contractor') ,createExpedition);
router.delete('/expedition/:id', authenticateToken ,checkRole('Sewing Contractor') ,deleteExpedition);
router.get("/expedition/:id", authenticateToken ,checkRole('Sewing Contractor') ,getexpeditionById);

export default router;
