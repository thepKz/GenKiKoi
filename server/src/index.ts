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
