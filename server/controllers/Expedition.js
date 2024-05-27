import exp from 'constants';
import Expedition from '../models/Expedition.js';

const getExpedition = async (req, res) => {
  try {
    // Fetch all receptions from the database
    const expedition = await Expedition.find();
    res.status(200).json(expedition); // Respond with the receptions in JSON format
  } catch (error) {
    res.status(500).json({ message: error.message }); // If there's an error, respond with an error message
  }
}

const updateExpedition = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    // Find the expedition by _id and update it with the provided data
    const updatedExpedition = await Expedition.findByIdAndUpdate(id, updatedData, { new: true });
    
    if (!updatedExpedition) {
      return res.status(404).json({ message: "Expedition not found" });
    }

    res.status(200).json(updatedExpedition); // Respond with the updated expedition
  } catch (error) {
    res.status(500).json({ message: error.message }); // If there's an error, respond with an error message
  }
};

const createExpedition = async (req, res) => {
  try {
    // Extract expedition data from the request body
    const { State, DispatchDate, ShippingNumber, UpdatedDate, TransportDate, Destination, NumberOfItemsSent, Comment } = req.body;

    // Create a new expedition document
    const newExpedition = new Expedition({
      State,
      DispatchDate,
      ShippingNumber,
      UpdatedDate,
      TransportDate,
      Destination,
      NumberOfItemsSent,
      Comment
    });

    // Save the new expedition to the database
    await newExpedition.save();

    // Respond with the newly created expedition
    res.status(201).json(newExpedition);
  } catch (error) {
    // Handle any errors that occur during the creation process
    res.status(500).json({ message: error.message });
  }
};

const deleteExpedition = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the expedition by ID and delete it
    const deletedExpedition = await Expedition.findByIdAndDelete(id);

    if (!deletedExpedition) {
      return res.status(404).json({ error: 'Expedition not found' });
    }

    // Return success message
    return res.status(200).json({ message: 'Expedition deleted successfully' });
  } catch (error) {
    console.error('Error deleting expedition:', error);
    return res.status(500).json({ error: 'An internal server error occurred' });
  }
};

const getexpeditionById =async (req, res) =>{
  try {
    const { id } = req.params;
    const expedition = await Expedition.findById(id);
    if (!expedition) {
      return res.status(404).json({ message: 'Expedition not found' });
    }
    res.status(200).json(expedition);
  } catch (error) {
    console.error('Error fetching expedition by ID:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export { getExpedition, updateExpedition, createExpedition, deleteExpedition, getexpeditionById };
