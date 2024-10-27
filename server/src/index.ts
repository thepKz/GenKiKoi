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
  distanceRoutes,
  doctorRoutes,
  paymentRoutes,
  serviceRoutes,
  staffRoutes,
  userRoutes,
  medicalRecordRoutes,
  pondRoutes,
  fishRoutes,
  doctorScheduleRoutes,
  feedbackRoutes,
  customerRoutes,
} from "./routes";
import { DoctorSchedule, MedicalRecord } from "./models";

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
app.use("/api/customers", customerRoutes);

// Export the app for testing purposes
export { app };

// Add medical record
const addMedicalRecord = async () => {
  try {
    const newMedicalRecord = await MedicalRecord.create({
      doctorId: "67015e789a7dce19f9fb0015",
      customerId: "6711fdbea11c8327da32e5e5",
      fishId: "6710abfd9145638f0eb79dde",
      examType: "Khám bệnh",
      serviceName: "Siêu âm",
      diagnosis: "Bệnh viêm da",
      treatment: "Sử dụng thuốc kháng sinh",
      medicines: [
        {
          name: "Thuốc A",
          quantity: 2,
        },
        {
          name: "Thuốc B",
          quantity: 1,
        },
      ],
      images: [
        "https://placehold.co/150x150?text=Demo1",
        "https://placehold.co/150x150?text=Demo2",
        "https://placehold.co/150x150?text=Demo3",
        "https://placehold.co/150x150?text=Demo4",
      ],
    });
    console.log(newMedicalRecord);
  } catch (error) {
    console.log(error);
  }
};

// addMedicalRecord()

// Add medical record
const addDoctorSchedule = async () => {
  try {
    const newDoctorSchedule = await DoctorSchedule.create({
      doctorId: "67015e789a7dce19f9fb0015", // Thay thế bằng ID thực của bác sĩ
      weekSchedule: [
        {
          dayOfWeek: "23/10/2023", // Thứ Hai
          slots: [
            {
              slotTime: "8:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "9:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "10:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "11:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "12:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "13:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "14:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "15:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "16:00",
              isBooked: false,
              appointmentId: null,
            },
          ],
        },
        {
          dayOfWeek: "25/10/2023", // Thứ 4
          slots: [
            {
              slotTime: "8:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "9:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "10:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "11:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "12:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "13:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "14:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "15:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "16:00",
              isBooked: false,
              appointmentId: null,
            },
          ],
        },
        {
          dayOfWeek: "26/10/2023", // Thứ 5
          slots: [
            {
              slotTime: "8:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "9:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "10:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "11:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "12:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "13:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "14:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "15:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "16:00",
              isBooked: false,
              appointmentId: null,
            },
          ],
        },
        {
          dayOfWeek: "28/10/2023", // Thứ 7
          slots: [
            {
              slotTime: "8:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "9:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "10:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "11:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "12:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "13:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "14:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "15:00",
              isBooked: false,
              appointmentId: null,
            },
            {
              slotTime: "16:00",
              isBooked: false,
              appointmentId: null,
            },
          ],
        },
      ],
    });
    console.log(newDoctorSchedule);
  } catch (error) {
    console.log(error);
  }
};

// addDoctorSchedule()

// Only start the server if this file is run directly (not imported as a module)
if (require.main === module) {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log("Connected to MongoDB successfully");
      app.listen(process.env.PORT || 5000, () => {
        console.log(`Server started at ${new Date().toISOString()}`);
        console.log(`Server is running on port ${process.env.PORT}`);
      });
    })
    .catch((error) => console.log("MongoDB connection error:", error));
}
