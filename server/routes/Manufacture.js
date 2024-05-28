import express from 'express';
import { createManufacture, deleteManufacture, getManufacture, getManufactureById, updateManufacture } from '../controllers/Manufacture.js';
import { checkRole } from '../utils/checkRole.js';
import { authenticateToken } from '../utils/authMiddleware.js';

const router = express.Router();

router.get('/manufacture', authenticateToken,checkRole('TLS admin', 'Sewing Contractor') ,getManufacture);
router.post("/createManufacture", authenticateToken,checkRole('TLS admin', 'Sewing Contractor') ,createManufacture);
router.delete("/manufacture/:id", authenticateToken,checkRole('TLS admin', 'Sewing Contractor') ,deleteManufacture);
router.put("/manufacture/:id", authenticateToken,checkRole('TLS admin', 'Sewing Contractor') ,updateManufacture);
router.get("/manufacture/:id", authenticateToken,checkRole('TLS admin', 'Sewing Contractor') ,getManufactureById);
export default router;
