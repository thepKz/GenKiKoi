import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// Routes
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import userRoutes from "./routes/userRouter";
import customerRouter from "./routes/customerRouter";
import doctorRouter from "./routes/doctorRouter";
import fishRouter from "./routes/fishRouter";
import serviceRouter from "./routes/serviceRouter";
import timeRouter from "./routes/timeRouter";
import timeServiceRouter from "./routes/timeServiceRouter";
import assignmentRouter from "./routes/assignmentRouter";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the GenKiKoi API");
});
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/user", userRoutes);
app.use("/api/customer", customerRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/fish", fishRouter);
app.use("/api/service", serviceRouter);
app.use("/api/time", timeRouter);
app.use("/api/timeService", timeServiceRouter);
app.use("/api/assignment", assignmentRouter);

console.log("SECRET_KEY:", process.env.SECRET_KEY);
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("MongoDB connection error:", error));
export default app;
