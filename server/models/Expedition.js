import mongoose from "mongoose";

const ExpeditionSchema = new mongoose.Schema(
  {
    State: {
      type: String
    },
    DispatchDate: {
        type: Date
    },
    ShippingNumber: {
        type: Number
    },
    UpdatedDate:{
        type: Date
    },
    TransportDate:{
        type: Date
    },
    Destination:{
        type: String
    },
    NumberOfItemsSent: {
        type: Number
    },
    Comment: {
        type: String
    },

  },
  { timestamps: true }
);

const Expedition = mongoose.model("Expedition", ExpeditionSchema);
export default Expedition;
