import express from 'express';
import { createManufacture, deleteManufacture, getManufacture, getManufactureById, updateManufacture } from '../controllers/Manufacture.js';
import { checkRole } from '../utils/checkRole.js';
import { authenticateToken } from '../utils/authMiddleware.js';

const router = express.Router();

router.get('/manufacture', authenticateToken,getManufacture);
router.post("/createManufacture", authenticateToken,createManufacture);
router.delete("/manufacture/:id", authenticateToken,deleteManufacture);
router.put("/manufacture/:id", authenticateToken,updateManufacture);
router.get("/manufacture/:id", authenticateToken,getManufactureById);
export default router;
