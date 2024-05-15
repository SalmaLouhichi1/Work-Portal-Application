import express from 'express';
import { getExpedition, updateExpedition, createExpedition, deleteExpedition } from '../controllers/Expedition.js';

const router = express.Router();

router.get('/expedition', getExpedition);
router.put('/expedition/:id', updateExpedition);
router.post("/createExpedition", createExpedition);
router.delete('/expedition/:id', deleteExpedition);

export default router;
