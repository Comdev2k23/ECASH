import { Router } from "express";
import { cashIn } from "../controllers/transactions/cashin.controller.js";
import { cashOut } from "../controllers/transactions/cashout.controller.js";

const transactionRoutes = Router()

transactionRoutes.post('/cashin', cashIn)
transactionRoutes.post('/cashout', cashOut)

export default transactionRoutes