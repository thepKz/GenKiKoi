import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

// Models
import {
  Appointment,
  Customer,
  Doctor,
  DoctorSlot,
  Service,
  TimeService,
  TimeSlot,
} from "./models";

// Routes
import { appointmentRoutes, authRoutes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Welcome to the GenKiKoi API");
});

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

// +++++++ ADD DATA +++++++

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
      userId: "66fe8784a277fa8f4fb20c96",
      specialization: "ABC",
      licenseNumber: "ABC-DHC",
      yearOfExperience: 4,
      movingService: 1,
    });

    const addedDoctor = await newDoctor.save();

    console.log(addedDoctor);
  } catch (error) {
    console.log(error);
  }
};
// addDoctor();

// Add DoctorSlot
const addDoctorSlot = async () => {
  try {
    const newDoctorSlot = new DoctorSlot({
      timeServiceId: "651b84a3f9e4a0d47e000601",
      doctorId: "66fe89be9f22e008f565e074",
      status: "Pending",
    });

    const addedDoctorSlot = await newDoctorSlot.save();

    console.log(addedDoctorSlot);
  } catch (error) {
    console.log(error);
  }
};
// addDoctorSlot();

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
      serviceName: "Khám cá",
      price: 200,
      description: "Demo",
    });

    const addedService = await newService.save();

    console.log(addedService);
  } catch (error) {
    console.log(error);
  }
};
// addService();

// Add TimeSlot
const addTimeSlot = async () => {
  try {
    const newTimeSlot = new TimeSlot({
      startTime: new Date(),
      endTime: new Date(),
    });

    const addedTimeSlot = await newTimeSlot.save();

    console.log(addedTimeSlot);
  } catch (error) {
    console.log(error);
  }
};
// addTimeSlot();

// Add TimeService
const addTimeService = async () => {
  try {
    const newTimeService = new TimeService({
      serviceId: "66feb03e0356b2ccda228b4c",
      timeSlotId: "66feb10f8bd8daf481ccc16f",
    });

    const addedTimeService = await newTimeService.save();

    console.log(addedTimeService);
  } catch (error) {
    console.log(error);
  }
};
// addTimeService();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("MongoDB connection error:", error));
