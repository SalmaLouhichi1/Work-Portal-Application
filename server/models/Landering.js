import mongoose from "mongoose";

const LanderingSchema = new mongoose.Schema(
  {
    Articlenumber: {
      type: Number
    },
    RequestDate: {
        type: Date
    },
    ExpectedDeliveryDate: {
        type: Date
    },
    QuantityReceived:{
        type: Number
    },
    RemainingQuantityToBeReceived:{
        type: Number
    },
    Article: {
        type: String
    },
    Maker: {
        type: String
    },
    QuantityToBeShipped:{
        type: Number
    },
    Comment: {
        type: String
    },

  },
  { timestamps: true }
);

const Landering = mongoose.model("Landering", LanderingSchema);
export default Landering;
