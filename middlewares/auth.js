import { verifyToken } from "../utils/jwt.js";

export const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] //Bearer Token

    if(!token) {
        return res.status(401).json({message: "No token, authorization denied"})
    }


    try {
        const decoded = verifyToken(token)
        req.user = decoded // Attach user info to request
        res.status(200).json({message: "user signed in"})
    } catch (error) {
        return res.status(401).json({message: "Token is not valid"})
    }
}