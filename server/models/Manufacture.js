import mongoose from "mongoose";

const ManufactureSchema = new mongoose.Schema(
  {
    OFnumber: {
      type: Number
    },
    RequestDate: {
        type: Date
    },
    ExpectedDeliveryDate: {
        type: Date
    },
    RemainingQuantityToBeReceived:{
        type: Number
    },
    QuantityShipped:{
        type: Number
    },
    QuantityStillToBeDelivered:{
        type: Number
    },
    Article: {
        type: String
    },
    Maker: {
        type: String
    },
    Country: {
        type: String
    },

  },
  { timestamps: true }
);

const Manufacture = mongoose.model("Manufacture", ManufactureSchema);
export default Manufacture;
