import { Schema, model } from "mongoose";

const timeSchema = new Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

const Time = model("Time", timeSchema, "times");

export default Time;
