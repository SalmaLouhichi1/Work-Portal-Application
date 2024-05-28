import  express  from "express";
import { getUser, getDashboardStats } from "../controllers/general.js";
import { checkRole } from "../utils/checkRole.js";
import { authenticateToken } from "../utils/authMiddleware.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/dashboard",authenticateToken,checkRole('TLS admin', 'Sewing Contractor', 'Washing Contractor'), getDashboardStats);

export default router;