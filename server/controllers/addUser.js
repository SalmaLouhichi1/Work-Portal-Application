import User from "../models/User.js";
import bcrypt from "bcrypt";

export const addUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            ContractorName,
            city,
            state,
            country,
            occupation,
            phoneNumber,
            transactions,
            role
        } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            ContractorName,
            city,
            state,
            country,
            occupation,
            phoneNumber,
            transactions,
            role
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Return success response
        res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
        // Handle errors
        console.error("Error occurred during user signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
