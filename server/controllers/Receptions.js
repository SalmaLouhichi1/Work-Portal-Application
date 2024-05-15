import Receptions from '../models/Receptions.js';

// Controller function to get all receptions
const getReceptions = async (req, res) => {
  try {
    // Fetch all receptions from the database
    const receptions = await Receptions.find();
    res.status(200).json(receptions); // Respond with the receptions in JSON format
  } catch (error) {
    res.status(500).json({ message: error.message }); // If there's an error, respond with an error message
  }
};

const createReception = async (req, res) => {
  try {
    // Extracting data from request body
    const {
      OFnumber,
      RequestDate,
      ExpectedDeliveryDate,
      RemainingQuantityToBeReceived,
      QuantityShipped,
      QuantityStillToBeDelivered,
      Article,
      Maker,
      Country,
    } = req.body;

    // Creating a new Reception instance
    const newReception = new Receptions({
      OFnumber,
      RequestDate,
      ExpectedDeliveryDate,
      RemainingQuantityToBeReceived,
      QuantityShipped,
      QuantityStillToBeDelivered,
      Article,
      Maker,
      Country,
    });

    // Saving the new Reception instance to the database
    const savedReception = await newReception.save();

    // Responding with the saved Reception instance
    res.status(201).json(savedReception);
  } catch (error) {
    // Handling errors
    console.error("Error creating Reception:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteReception = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the expedition by ID and delete it
    const deleteReception = await Receptions.findByIdAndDelete(id);

    if (!deleteReception) {
      return res.status(404).json({ error: 'Reception not found' });
    }

    // Return success message
    return res.status(200).json({ message: 'Reception deleted successfully' });
  } catch (error) {
    console.error('Error deleting Reception:', error);
    return res.status(500).json({ error: 'An internal server error occurred' });
  }
};

export { getReceptions, createReception, deleteReception };
