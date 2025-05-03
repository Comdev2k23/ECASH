import express from "express";
import mongoose from "mongoose";

const app =  express()
const PORT = 3000

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
