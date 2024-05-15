import Manufacture from '../models/Manufacture.js';

const getManufacture = async (req, res) => {
  try {
    // Fetch all receptions from the database
    const manufacture = await Manufacture.find();
    res.status(200).json(manufacture); 
  } catch (error) {
    res.status(500).json({ message: error.message }); // If there's an error, respond with an error message
  }
};

const createManufacture = async (req, res) => {
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

    // Creating a new Manufacture instance
    const newManufacture = new Manufacture({
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

    // Saving the new Manufacture instance to the database
    const savedManufacture = await newManufacture.save();

    // Responding with the saved Manufacture instance
    res.status(201).json(savedManufacture);
  } catch (error) {
    // Handling errors
    console.error("Error creating Manufacture:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteManufacture = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the expedition by ID and delete it
    const deleteManufacture = await Manufacture.findByIdAndDelete(id);

    if (!deleteManufacture) {
      return res.status(404).json({ error: 'Manufacture not found' });
    }

    // Return success message
    return res.status(200).json({ message: 'Manufacture deleted successfully' });
  } catch (error) {
    console.error('Error deleting Manufacture:', error);
    return res.status(500).json({ error: 'An internal server error occurred' });
  }
};

export { getManufacture, createManufacture, deleteManufacture };
