import User from "../models/User.js";

const getUsersByRole = async (req, res, role) => {
  try {
    const users = await User.find({ role }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAdmins = async (req, res) => {
  await getUsersByRole(req, res, "admin");
};

export const getSuperAdmins = async (req, res) => {
  await getUsersByRole(req, res, "superadmin");
};
