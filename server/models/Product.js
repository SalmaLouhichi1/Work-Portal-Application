import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    State: String,
    SendDate: Date,
    Comment: String,
    UpdateDate: Date,
    TypeOfTransport: String,
    Destination: String,
    NumberOfItemsSent: Number,
    ShippingNumber: Number,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;