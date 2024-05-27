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

const router = express.Router();

router.get("/products/:id", getProducts);
router.put('/products/:id', updateProduct);
router.post("/createproduct", createProduct);
router.delete('/products/:id', deleteProduct);
router.get("/product/:id", getProductById);
router.get("/productstat/:productId", getProductStat);
router.put("/productStat/:productId", updateProductStat);
//router.post('/createproductstat', createProductStat);

export default router;