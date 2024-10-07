import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
// @ts-ignore
dotenv.config();

// Models
import {
  Appointment,
  Customer,
  Doctor,
  DoctorSchedule,
  Service,
} from "./models";

// Routes
import {
  appointmentRoutes,
  authRoutes,
  serviceRoutes,
  userRoutes,
} from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Welcome to the GenKiKoi API");
});

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);

// +++++++ ADD DATA +++++++
// Cái này t dùng để add tam dữ liêu!
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

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("MongoDB connection error:", error));
