import User from "../models/User.js";
import bcrypt from "bcrypt";

export const signupUser = async (req, res) =>{
    try {
        const {
            name,
            email,
            password,
            city,
            state,
            country,
            occupation,
            phoneNumber,
            transactions,
            role
        } = req.body;
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with hashed password
        const newUser = new User({
            name,
            email,
            password: hashedPassword, // Store the hashed password
            city,
            state,
            country,
            occupation,
            phoneNumber,
            transactions,
            role
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Respond with success message and user data
        res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
        // Proper error handling
        console.error("Error occurred during user signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
