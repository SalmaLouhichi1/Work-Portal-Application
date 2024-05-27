import exp from 'constants';
import Landering from '../models/Landering.js';

const getLandering = async (req, res) => {
  try {
    // Fetch all receptions from the database
    const landering = await Landering.find();
    res.status(200).json(landering); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
}

const updateLandering = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    
    const updatedLandering = await Landering.findByIdAndUpdate(id, updatedData, { new: true });
    
    if (!updatedLandering) {
      return res.status(404).json({ message: "Landering not found" });
    }

    res.status(200).json(updatedLandering); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

const createLandering = async (req, res) => {
  try {
    const { Articlenumber, RequestDate, ExpectedDeliveryDate, QuantityReceived, RemainingQuantityToBeReceived, Article, Maker,QuantityToBeShipped, Comment } = req.body;

    const newLandering = new Landering({
      Articlenumber,
      RequestDate,
      ExpectedDeliveryDate,
      QuantityReceived,
      RemainingQuantityToBeReceived,
      Article,
      Maker,
      QuantityToBeShipped,
      Comment
    });

    // Save the new Landering to the database
    await newLandering.save();

    res.status(201).json(newLandering);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLandering = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLandering = await Landering.findByIdAndDelete(id);

    if (!deletedLandering) {
      return res.status(404).json({ error: 'Landering not found' });
    }

    // Return success message
    return res.status(200).json({ message: 'Landering deleted successfully' });
  } catch (error) {
    console.error('Error deleting Landering:', error);
    return res.status(500).json({ error: 'An internal server error occurred' });
  }
};

const getLanderingById =async (req, res) =>{
  try {
    const { id } = req.params;
    const landering = await Landering.findById(id);
    if (!landering) {
      return res.status(404).json({ message: 'Landering not found' });
    }
    res.status(200).json(landering);
  } catch (error) {
    console.error('Error fetching Landering by ID:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export { getLandering, updateLandering, createLandering, deleteLandering, getLanderingById };
