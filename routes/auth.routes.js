import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";


const authRoutes = Router()

authRoutes.post('/signup', signUp)
authRoutes.post('/signin', signIn)


export default authRoutes