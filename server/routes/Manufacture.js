import express from 'express';
import { createManufacture, deleteManufacture, getManufacture, getManufactureById, updateManufacture } from '../controllers/Manufacture.js';

const router = express.Router();

router.get('/manufacture', getManufacture);
router.post("/createManufacture", createManufacture);
router.delete("/manufacture/:id", deleteManufacture);
router.put("/manufacture/:id", updateManufacture);
router.get("/manufacture/:id", getManufactureById);
export default router;
