import express from 'express';
import { createManufacture, deleteManufacture, getManufacture } from '../controllers/Manufacture.js';

const router = express.Router();

router.get('/manufacture', getManufacture);
router.post("/createManufacture", createManufacture);
router.delete("/manufacture/:id", deleteManufacture);

export default router;
