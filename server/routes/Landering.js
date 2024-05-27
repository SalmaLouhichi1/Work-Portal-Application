import express from 'express';
import { createLandering, deleteLandering, getLandering, getLanderingById, updateLandering} from '../controllers/Landering.js';

const router = express.Router();

router.get('/landering', getLandering);
router.put('/landering/:id', updateLandering);
router.post("/createLandering", createLandering);
router.delete('/landering/:id', deleteLandering);
router.get("/landering/:id", getLanderingById);

export default router;
