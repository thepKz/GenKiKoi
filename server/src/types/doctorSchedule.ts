interface DoctorSchedule {
  _id: string;
  doctorId: string;
  weekSchedule: Array<{
    day: number;
    schedule: Array<{
      startTime: string;
      endTime: string;
    }>;
  }>;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
