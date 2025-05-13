import { verifyToken } from "../utils/jwt.js";

export const protect = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Extract the token part (without the 'Bearer ' prefix)
    const tokenWithoutBearer = token.split(' ')[1];

    try {
        const decoded = verifyToken(tokenWithoutBearer); // Pass the token without the 'Bearer ' prefix
        console.log("✅ Token Decoded:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired, please login again" });
        }
        console.error("❌ Token verification error:", error.message);
        return res.status(401).json({ message: "Token is not valid" });
    }
};
