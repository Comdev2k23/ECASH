import User from "../models/User.model.js";
import { generateToken } from "../utils/jwt.js";


// Register a new user (sign up)
export const signUp = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;

    // Check if name, username, and password are provided
    if (!name || !username || !password) {
      return res.status(422).json({ message: "Name, username and password are required" });
    }

    // Check if the user already exists
    const isUserExists = await User.findOne({ username });
    if (isUserExists) {
      return res.status(409).json({ message: "User already exists" }); // 409 Conflict
    }

    // Create new user with hashed password
    const user = new User({ name, username, password });  // User schema will automatically hash the password

    // Save the user to the database
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    // Return response with token
    res.status(201).json({ token });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};


// User login (sign in)
export const signIn = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Check if username and password are provided
        if (!username || !password) {
            return res.status(422).json({ message: "Username and password are required" });
        }

        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" }); // 401 Unauthorized
        }

        // Generate JWT token
        const token = generateToken(user._id);

        // Return response with token
        res.status(200).json({ token });

    } catch (error) {
        next(error); // Pass the error to global error handler
    }
};
