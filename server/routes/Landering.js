import express from 'express';
import { createLandering, deleteLandering, getLandering, getLanderingById, updateLandering} from '../controllers/Landering.js';
import { checkRole } from '../utils/checkRole.js';

const router = express.Router();

router.get('/landering', authenticateToken,checkRole('TLS admin', 'Washing Contractor') ,getLandering);
router.put('/landering/:id', authenticateToken,checkRole('TLS admin', 'Washing Contractor') ,updateLandering);
router.post("/createLandering", authenticateToken,checkRole('TLS admin', 'Washing Contractor') ,createLandering);
router.delete('/landering/:id', authenticateToken,checkRole('TLS admin', 'Washing Contractor') ,deleteLandering);
router.get("/landering/:id", authenticateToken,checkRole('TLS admin', 'Washing Contractor') ,getLanderingById);

export default router;
