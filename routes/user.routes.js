import { Router } from "express";
import { createDummyUser, deleteAllTransactions, deleteAllUsers, deleteTransaction, deleteUser, getAllUsers, getTransactions, getUser } from "../controllers/user.controller.js";
import { cashIn } from "../controllers/cashin.controller.js";
import { cashOut } from "../controllers/cashout.controller.js";

const userRoutes = Router()

userRoutes.get('/', getAllUsers)
userRoutes.get('/:id', getUser)
userRoutes.post('/dummy', createDummyUser)
userRoutes.post('/cashin', cashIn)
userRoutes.post('/cashout', cashOut)
userRoutes.get('/transactions/:userId', getTransactions)
userRoutes.delete('/:userId/transactions/:transactionId', deleteTransaction)
userRoutes.delete('/clear-transactions/:userId', deleteAllTransactions)
userRoutes.delete('/:userId', deleteUser)
userRoutes.delete('/', deleteAllUsers)

export default userRoutes