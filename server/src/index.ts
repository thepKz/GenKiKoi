import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { swaggerDocument, swaggerUi } from "./swagger";
// @ts-ignore
dotenv.config();

// Routes
import {
  appointmentRoutes,
  authRoutes,
  customerRoutes,
  distanceRoutes,
  doctorRoutes,
  doctorScheduleRoutes,
  feedbackRoutes,
  fishRoutes,
  managerRoutes,
  medicalRecordRoutes,
  paymentRoutes,
  pondRoutes,
  serviceRoutes,
  staffRoutes,
  userRoutes,
} from "./routes";

// SERVICES
import { startScheduledTasks } from "./services/sheduledTasks";
import { updateExpiredPayments } from "./services/updateExpiredPayments";
import { Manager, User } from "./models";

const app = express();

const allowedOrigins = [
  "https://staginggenkikoi.netlify.app",
  "http://localhost:5000",
  "http://localhost:5173",
  "https://productiongenkikoi.netlify.app",
  "http://localhost:5174",
  "https://admingenkikoi.netlify.app",
  "https://genkikoi-backend.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  console.log("Log message on backend");
  res.send("Welcome to the GenKiKoi API");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/staffs", staffRoutes);
app.use("/api/managers", managerRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/medicalRecords", medicalRecordRoutes);
app.use("/api/ponds", pondRoutes);
app.use("/api/fishes", fishRoutes);
app.use("/api/distance", distanceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/doctorSchedules", doctorScheduleRoutes);
app.use("/api/feedbacks", feedbackRoutes);

// Export the app for testing purposes
export { app };

startScheduledTasks();
updateExpiredPayments();

const AddManager = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash("11111111", salt);

    const newUser = new User({
      username: "lehuy89",
      email: "manager.lehuy@gmail.com",
      password: hashedPass,
      fullName: "Lê Huy Vũ",
      phoneNumber: "0352195824",
      photoUrl: "https://firebasestorage.googleapis.com/v0/b/genkikoi-e18b5.appspot.com/o/managers%2Fmanager.jpg?alt=media&token=8733e5a4-fdb5-48b4-8132-66d5d90f08ba",
      role: "manager",
      gender: "nam",
      isDisabled: false,
    });

    const savedUser = await newUser.save();

    const newManager = new Manager({
      userId: savedUser._id,
      position: "Quản lý cấp cao",
      startDate: new Date(),
    });

    await newManager.save();

    console.log(newManager);
  } catch (error) {
    console.log(error);
  }
};

// AddManager();

// Only start the server if this file is run directly (not imported as a module)
if (require.main === module) {
  const port = process.env.PORT || 5000;

  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log("Connected to MongoDB successfully");
      app.listen(port, () => {
        console.log(`Server started at ${new Date().toISOString()}`);
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch((error) => console.log("MongoDB connection error:", error));
}
