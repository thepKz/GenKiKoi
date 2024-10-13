import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
} from "@schedule-x/calendar";

import "@schedule-x/theme-default/dist/index.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";

const DoctorCalendar = () => {
  const calendar = useCalendarApp({
    views: [createViewWeek(), createViewDay(), createViewMonthGrid()],
    events: [
      {
        id: "1",
        title: "Ca sáng",
        start: "2024-10-07 08:00",
        end: "2024-10-07 11:00",
        description: "Ca: 8:00, 9:00, 10:00",
      },
      {
        id: "2",
        title: "Ca chiều",
        start: "2024-10-07 12:00",
        end: "2024-10-07 17:00",
        description: "Ca: 12:00, 13:00, 14:00, 15:00, 16:00",
      },
      {
        id: "3",
        title: "Ca sáng",
        start: "2024-10-09 08:00",
        end: "2024-10-09 11:00",
        description: "Ca: 8:00, 9:00, 10:00",
      },
      {
        id: "4",
        title: "Ca chiều",
        start: "2024-10-09 12:00",
        end: "2024-10-09 17:00",
        description: "Ca: 12:00, 13:00, 14:00, 15:00, 16:00",
      },
      {
        id: "5",
        title: "Ca sáng",
        start: "2024-10-10 08:00",
        end: "2024-10-10 11:00",
        description: "Ca: 8:00, 9:00, 10:00",
      },
      {
        id: "6",
        title: "Ca chiều",
        start: "2024-10-10 12:00",
        end: "2024-10-10 17:00",
        description: "Ca: 12:00, 13:00, 14:00, 15:00, 16:00",
      },
      {
        id: "7",
        title: "Ca sáng",
        start: "2024-10-12 08:00",
        end: "2024-10-12 11:00",
        description: "Ca: 8:00, 9:00, 10:00",
      },
      {
        id: "8",
        title: "Ca chiều",
        start: "2024-10-12 12:00",
        end: "2024-10-12 17:00",
        description: "Ca: 12:00, 13:00, 14:00, 15:00, 16:00",
      },
    ],
    dayBoundaries: {
      start: "07:00",
      end: "20:00",
    },
    plugins: [createEventModalPlugin()],
  });
  return (
    <div>
      <div className="container mx-auto my-5 h-[calc(100vh-115px)] rounded-md bg-white p-5 shadow-sm lg:w-[95%]">
        <div className="">
          <ScheduleXCalendar calendarApp={calendar} />
        </div>
      </div>
    </div>
  );
};

export default DoctorCalendar;
