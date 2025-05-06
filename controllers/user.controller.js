import User from "../models/User.model.js";


export const getAllUsers = async (req, res, next) => {
    try {
        
        const users = await User.find();
        res.json(users)
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({message: "Server Error", error: error.message})
        next(error);
    } 
}

export const getUser = async (req, res, next) => {
    const {userId} = req.params;
        try {
            const user = await User.findById(userId)
            if(!user){
                return res.status(404).json({message: "User not found"})
            }
            res.json(user)
        } catch (error) {
            console.error("Error fetching User", error)
            res.status(500).json({message: "Server Error", error: error.message})
            next(error);
        }
}

export const createDummyUser = async (req, res, next) => {
    try {
        const user = new User({name: "Dummy User", balance: 100});
        await user.save()
        res.status(201).json({message: "User has been created", user})
    } catch (error) {
        console.error("Error creating a user", error)
        res.status(500).json({message: "Server Error", error: error.message})
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    const {userId} = req.params;
      try {
            const user = await User.findByIdAndDelete(userId)
            if(!user){
                res.status(404).json({message: "User not found"})
            }
            res.status(200).json({message: "User has been deleted", user})
      } catch (error) {
        console.error("Error deleting user", error)
        res.status(500).jsoon({message: "Server Error", error: error.message})
        next(error);
      }
    }
export const deleteAllUsers = async (req, res, next) => {
    try {
        const users = await User.deleteMany()
        res.status(200).json({message: "All users have been deleted", users})
    } catch (error) {
        console.error("Error deleting all users", error)
        res.status(500).json({message: "Server Error", error: error.message})
        next(error);
    }
}

export const getTransactions = async () => {
    const {userId} = req.params
        try {
            const user = await User.findById(userId)
            if(!user){
                res.status(404).json({message: "User not found"})
            }
            res.status(200).json({transactions: user.transactions, balance: user.balance})
        } catch (error) {
            console.error("Error fetching transactions", error)
            res.status(500).json({message: "Server Error", error: error.message})
            next()
        }
}

export const deleteTransaction = async (req, res, next) => {
    const {userId, transactionId} = req.params
    try {
        const user = await User.findById(userId)
        if(!user){
            res.status(404).json({message: "User not found"})
        }

        const initialTransactionLength = user.transactions.length
        user.transactions = user.transactions.filter(tx => tx._id.toString() !== transactionId)
        if(user.transactions.length === initialTransactionLength){
            res.status(404).json({message: "Transaction not found"})
        }

        await user.save()
        res.status(200).json({message: "Transaction has been deleted", user})
    
    } catch (error) {
        console.error("Error deleting transaction", error)
        res.status(500).json({message: "Server Error", error: error.message})
        next()
    }
}

export const deleteAllTransactions = async () => {
    const {userId} = req.params
    try {
        const user =  await User.findById(userId)
        if(!user){
            res.status(404).json({message: "User not found"})
        }
        user.transactions = []
        await user.save()
        res.status(200).json({message: "All transactions have been deleted", user})
    } catch (error) {
        console.error("Error deleting all transactions", error)
        res.status(500).json({message: "Server Error", error: error.message})
        next()
    }
}
