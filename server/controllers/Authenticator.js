import User from "../models/User.js";

export const getUserById = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};
