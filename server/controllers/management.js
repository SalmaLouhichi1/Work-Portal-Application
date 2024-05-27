import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import { Types } from 'mongoose';

const getUsersByRole = async (req, res, role) => {
  try {
    const users = await User.find({ role }).select("-password");
    res.status(200).json(users);
  } catch (error) { 
    res.status(404).json({ message: error.message });
  }
};

export const getTLSAdmins = async (req, res) => {
  await getUsersByRole(req, res, "TLS admin");
};

export const getSewingContractor = async (req, res) => {
  await getUsersByRole(req, res, "Sewing Contractor");
};

export const getWashingContractor = async (req, res) => {
  await getUsersByRole(req, res, "Washing Contractor");
};

export const deleteUser = async(req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await User.findByIdAndDelete(id);

    if (!deleteUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting User:', error);
    return res.status(500).json({ error: 'An internal server error occurred' });
  }
};
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

const { ObjectId } = Types;
export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Received ID: ${id}`); 

    const objectId = new ObjectId(id);

    const userWithStats = await User.aggregate([
      { $match: { _id: objectId } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    if (!userWithStats.length) {
      return res.status(404).json({ message: 'User not found or no affiliate stats available' });
    }

    console.log(`User with stats: ${JSON.stringify(userWithStats[0])}`); // Debugging line

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );
    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    console.error(`Error: ${error.message}`); // Debugging line
    res.status(404).json({ message: error.message });
  }
};