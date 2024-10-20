import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { swaggerDocument, swaggerUi } from "./swagger";
// @ts-ignore
dotenv.config();

// Models
import {
  Appointment,
  Customer,
  Doctor,
  DoctorSchedule,
  Manager,
  Service,
  Staff,
} from "./models";

// Routes
import {
  appointmentRoutes,
  authRoutes,
  doctorRoutes,
  paymentRoutes,
  serviceRoutes,
  staffRoutes,
  userRoutes,
} from "./routes";

const app = express();

const allowedOrigins = [
  "https://staginggenkikoi.netlify.app",
  "http://localhost:5000",
  "http://localhost:5173",
  "https://productiongenkikoi.netlify.app",
  "http://localhost:5174",
  "https://admingenkikoi.netlify.app",
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
app.use("/api/payments", paymentRoutes);

// +++++++ ADD DATA +++++++
// Cái này t dùng để add tạm dữ liêu!

// Add manager
const addManager = async () => {
  try {
    const newManager = new Manager({
      userId: "67028f335b63ca0427bcad16",
    });

    const addedManager = await newManager.save();

    console.log(addedManager);
  } catch (error) {
    console.log(error);
  }
};
// addManager();

// Add manager
const addStaff = async () => {
  try {
    const newStaff = new Staff({
      userId: "67028ef15b63ca0427bcad11",
      workShift: "Afternoon",
    });

    const addedStaff = await newStaff.save();

    console.log(addedStaff);
  } catch (error) {
    console.log(error);
  }
};
// addStaff();

// Add customer
const addCustomer = async () => {
  try {
    const newCustomer = new Customer({
      userId: "66fe85f6a277fa8f4fb20c91",
      address: "Ho Chi Minh City",
      gender: 0,
    });

    const addedCustomer = await newCustomer.save();

    console.log(addedCustomer);
  } catch (error) {
    console.log(error);
  }
};
// addCustomer();

// Add Doctor
const addDoctor = async () => {
  try {
    const newDoctor = new Doctor({
      userId: "67015a6f730a407f11ff9a0d",
      specialization: "ABd",
      licenseNumber: "AcfC-fHC",
      yearOfExperience: 2,
      movingService: 0,
    });

    const addedDoctor = await newDoctor.save();

    console.log(addedDoctor);
  } catch (error) {
    console.log(error);
  }
};
// addDoctor();

// Add Appointment
const addAppointment = async () => {
  try {
    const newAppointment = new Appointment({
      doctorSlotId: "66fe8af5e0b859a4a16b9c06",
      doctorId: "66fe89be9f22e008f565e074",
      customerId: "66fe88b8534775b7bf86705b",
      appointmentDate: "2024-10-20T09:00:00.000+00:00",
      status: "Confirmed",
    });

    const addedAppointment = await newAppointment.save();

    console.log(addedAppointment);
  } catch (error) {
    console.log(error);
  }
};
// addAppointment();

// Add Service
const addService = async () => {
  try {
    const newService = new Service({
      serviceName: "Đánh giá chất lượng nước",
      price: 100000,
      availableAt: ["Tại nhà", "Tại phòng khám"],
    });

    const addedService = await newService.save();

    console.log(addedService);
  } catch (error) {
    console.log(error);
  }
};
// addService();

// Add Doctor Schedule
const addDoctorSchedule = async () => {
  try {
    const newDoctorSchedule = new DoctorSchedule({
      doctorId: "66fe89be9f22e008f565e074", // Thay bằng ObjectId của bác sĩ tương ứng
      weekSchedule: [
        {
          dayOfWeek: "Monday",
          slots: generateSlots(), // Gọi hàm để tạo các slots cho thứ 2
        },
        {
          dayOfWeek: "Tuesday",
          slots: generateSlots(), // Gọi hàm để tạo các slots cho thứ 3
        },
        {
          dayOfWeek: "Wednesday",
          slots: generateSlots(),
        },
        {
          dayOfWeek: "Thursday",
          slots: generateSlots(),
        },
        {
          dayOfWeek: "Friday",
          slots: generateSlots(),
        },
        {
          dayOfWeek: "Saturday",
          slots: generateSlots(),
        },
        {
          dayOfWeek: "Sunday",
          slots: generateSlots(),
        },
      ],
    });

    const addedDoctorSchedule = await newDoctorSchedule.save();
    console.log(addedDoctorSchedule);
  } catch (error) {
    console.log(error);
  }
};

function generateSlots() {
  const timeSlots = [
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  return timeSlots.map((time) => ({
    time: time,
    isAvailable: true, // Mặc định là có sẵn để khách hàng đặt lịch
    isBooked: false, // Mặc định là chưa được đặt
  }));
}

// addDoctorSchedule()

// Export the app for testing purposes
export { app };

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
