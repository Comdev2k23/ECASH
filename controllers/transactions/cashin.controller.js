import User from "../../models/User.model.js"


export const cashIn = async (req, res, next) => {
    const { userId, amount, referenceNumber} = req.body
    try {
        if(!userId || !amount || !referenceNumber){
            return res.status(404).json({message: "userId, amount, reference number are required..."})
        }

        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        //Check if the reference number was already used
        const  isReferenceNumberUsed = user.transactions.some(transaction=> transaction.referenceNumber === referenceNumber)

        if(isReferenceNumberUsed){
            return res.status(400).json({message: "Reference number already used"})
        }

        //Check if Balance is insufficient
        if(user.balance < amount) {
            return res.status(400).json({message: "Insufficient balance"})

        }

        //Update the user balance and transactions
        user.balance -= amount
        user.transactions.push({
            referenceNumber,
            type: "cashin",
            amount,
        })
        
        await user.save()

        res.status(201).json({message: "Cash in successful", balance:  user.balance})

    } catch (error) {
        next(error)
    }
}