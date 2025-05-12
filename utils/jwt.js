import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

//Generate a JWT token
export const generateToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}


// Verify the JWT token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SCRET)
    } catch (error) {
        throw new Error("Invalid or expired token")
    }
}