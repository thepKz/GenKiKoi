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
}
