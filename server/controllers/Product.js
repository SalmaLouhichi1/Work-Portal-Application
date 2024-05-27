import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";

export const getProducts = async (req, res) => {
    try {
      const products = await Product.find();
  
      const productsWithStats = await Promise.all(
        products.map(async (product) => {
          const stat = await ProductStat.find({
            productId: product._id,
          });
          return {
            ...product._doc,
            stat,
          };
        })
      );
  
      res.status(200).json(productsWithStats);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  /*export const createProduct = async (req, res) => {
    try {
      
      // Extracting data from request body
      const {
        name,
        price,
        description,
        category,
        rating,
        supply,
      } = req.body;
  
      const newProduct = new Product({
        name,
        price,
        description,
        category,
        rating,
        supply,
      });
  
      const savedProduct = await newProduct.save();
  
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error("Error creating Product:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };*/ 

  export const createProduct = async (req, res) => {
    try {
      const { name, price, description, category, rating, supply, yearlySalesTotal, yearlyTotalSoldUnits } = req.body;
  
      // Create the Product
      const newProduct = new Product({
        name,
        price,
        description,
        category,
        rating,
        supply,
      });
  
      const savedProduct = await newProduct.save();
  
      // Create the ProductStat using the product ID from savedProduct
      const newProductStat = new ProductStat({
        productId: savedProduct._id,
        yearlySalesTotal,
        yearlyTotalSoldUnits,
        year: new Date().getFullYear(),
        monthlyData: [],
        dailyData: [],
      });
  
      const savedProductStat = await newProductStat.save();
  
      res.status(201).json({ product: savedProduct, productStat: savedProductStat });
    } catch (error) {
      console.error("Error creating Product and ProductStat:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  export const deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleteProduct = await Product.findByIdAndDelete(id);
  
      if (!deleteProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting Product:', error);
      return res.status(500).json({ error: 'An internal server error occurred' });
    }
  };
  
  export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      // Remove _id if present in updatedData to avoid conflict
      delete updatedData._id;
  
      const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).send({ message: 'Product not found' });
      }
  
      res.status(200).send(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error.message);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };

  
  
  export const getProductById =async (req, res) =>{
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching Product by ID:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const getProductStat = async (req, res) => {
    const { productId } = req.params; // Extract productId from request params
  
    try {
      const productStat = await ProductStat.find({ productId });
  
      if (productStat.length === 0) {
        return res.status(404).json({ message: 'ProductStat not found' });
      }
  
      res.status(200).json(productStat);
    } catch (error) {
      console.error('Error fetching ProductStat:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  

  export const updateProductStat = async (req, res) => {
    const { productId } = req.params; 
    const updatedData = req.body;
  
    try {
      delete updatedData._id;
  
      const updatedProductStat = await ProductStat.findOneAndUpdate(
        { productId },
        updatedData,
        { new: true }
      );
  
      if (!updatedProductStat) {
        return res.status(404).send({ message: 'ProductStat not found' });
      }
  
      res.status(200).send(updatedProductStat);
    } catch (error) {
      console.error('Error updating ProductStat:', error.message);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };

  /*export const createProductStat = async (req, res) => {
    try {
      
      const {
        productId,
        yearlySalesTotal,
        yearlyTotalSoldUnits,
      } = req.body;
  
      const newProductStat = new ProductStat({
        productId,
        yearlySalesTotal,
        yearlyTotalSoldUnits,
      });
  
      const savedProductStat = await newProductStat.save();
  
      res.status(201).json(savedProductStat);
    } catch (error) {
      console.error("Error creating ProductStat:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };*/

