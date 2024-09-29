import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// Routes
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
  app.get('/', (req, res) => {
    res.send('Welcome to the GenKiKoi API');
  });
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('FALLBACK_SECRET:', process.env.FALLBACK_SECRET);
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log('MongoDB connection error:', error));
export default app;
