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
import { authenticateToken } from "../utils/authMiddleware.js";

const router = express.Router();

router.get("/products/:id", authenticateToken,getProducts);
router.put('/products/:id', authenticateToken,updateProduct);
router.post("/createproduct", authenticateToken,createProduct);
router.delete('/products/:id', authenticateToken,deleteProduct);
router.get("/product/:id", authenticateToken,getProductById);
router.get("/productstat/:productId", authenticateToken,getProductStat);
router.put("/productStat/:productId", authenticateToken,updateProductStat);


export default router;