import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Generate a JWT token
export const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h"
    });
};

// Verify the JWT token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error("❌ Token verification error:", error.message);
        throw error;
    }
};