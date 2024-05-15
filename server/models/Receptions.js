import mongoose from "mongoose";

const ReceptionsSchema = new mongoose.Schema(
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

const Receptions = mongoose.model("Receptions", ReceptionsSchema);
export default Receptions;
