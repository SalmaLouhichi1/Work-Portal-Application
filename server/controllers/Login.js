import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../utils/authUtils.js";

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If the password is invalid, return an error
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate a token for the user
        const token = generateToken(user);

        // Return user data and token
        return res.status(200).json({ user, token });
    } catch (error) {
        // Handle unexpected errors
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { login };
