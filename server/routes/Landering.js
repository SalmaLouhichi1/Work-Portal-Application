import express from 'express';
import { createLandering, deleteLandering, getLandering, getLanderingById, updateLandering} from '../controllers/Landering.js';
import { checkRole } from '../utils/checkRole.js';
import { authenticateToken } from '../utils/authMiddleware.js';

const router = express.Router();

router.get('/landering', authenticateToken ,getLandering);
router.put('/landering/:id', authenticateToken ,updateLandering);
router.post("/createLandering", authenticateToken ,createLandering);
router.delete('/landering/:id', authenticateToken ,deleteLandering);
router.get("/landering/:id", authenticateToken ,getLanderingById);

export default router;
