import User from "../../models/User.model.js";

export const updateUserBalance = async (req, res, next) =>  {
    const {userId, newBalance} = req.body

    try {
        //Check if the userId and newBalance are provided
        if(!userId || newBalance === undefined) {
            return res.status(400).json({message: "UserId and new Balance are required"})
        }

        //Check if the new Balance is a negative number or 0
        if(newBalance <= 0){
            return res.status(400).json({message: "The new balance must not a negative amout"})
        }

        const user =  await User.findById(userId)

        //Update the Balance with new Balance
        user.balance = newBalance

        //Save the new balance
        await user.save()

        res.status(201).json({message: "Balance updated successfully", balance: user.balance})

    } catch (error) {
        next(error)
    }
}