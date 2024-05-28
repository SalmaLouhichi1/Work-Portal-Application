import express from "express";
import {
  getProducts,
  updateProduct,
  createProduct,
  deleteProduct,
  getProductById,
  getProductStat,
  updateProductStat,
  //createProductStat,
} from "../controllers/Product.js";
import { checkRole } from "../utils/checkRole.js";

const router = express.Router();

router.get("/products/:id", authenticateToken,checkRole('TLS admin', 'Washing Contractor') ,getProducts);
router.put('/products/:id', authenticateToken,checkRole('TLS admin', 'Washing Contractor') ,updateProduct);
router.post("/createproduct", authenticateToken,checkRole('TLS admin', 'Washing Contractor') ,createProduct);
router.delete('/products/:id', authenticateToken,checkRole('TLS admin', 'Washing Contractor') ,deleteProduct);
router.get("/product/:id", authenticateToken,checkRole('TLS admin', 'Washing Contractor') ,getProductById);
router.get("/productstat/:productId", authenticateToken,checkRole('TLS admin', 'Washing Contractor') ,getProductStat);
router.put("/productStat/:productId", authenticateToken,checkRole('TLS admin', 'Washing Contractor') ,updateProductStat);


export default router;