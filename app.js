import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";

// Load environment variables
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env.development' });
}

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// MongoDB connection
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

export default app;
