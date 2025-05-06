import User from "../models/User.model.js"


export const cashIn = async (req, res, next) => {
    const { userId, amount, referenNumber} = req.body
    try {
        
    } catch (error) {
        next()
    }
}