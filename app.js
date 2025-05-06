import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";

const app =  express()
const PORT = 3000

//Middleware
app.use(express.json())


//Routes
app.use('/api/users', userRoutes)


// MongoDB connection
mongoose
  .connect( "mongodb+srv://nachttv22:nachttv22@ecash.5u01dff.mongodb.net/ECASH?retryWrites=true&w=majority&appName=ecash",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})






export default app