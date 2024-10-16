import { Breadcrumb } from "antd";
import { Calendar } from "iconsax-react";
import { Link } from "react-router-dom";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
} from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";

const DoctorCalendar = () => {
  const calendar = useCalendarApp({
    views: [createViewWeek(), createViewDay(), createViewMonthGrid()],
    events: [
      {
        id: 1,
        start: "2024-10-14 09:00",
        end: "2024-10-14 11:00",
        description: "Ca sáng",
      },
    ],
    dayBoundaries: {
      start: "07:00",
      end: "22:00",
    },
    plugins: [createEventModalPlugin()],
  });
  return (
    <div className="section">
      <Breadcrumb
        separator=">"
        items={[
          {
            title: (
              <Link to="/staff/doctor-calendar">
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  Lịch làm việc của bác sĩ
                </div>
              </Link>
            ),
          },
          {
            title: <Link to="/staff/doctor-calendar">Danh sách bác sĩ</Link>,
          },
          {
            title: "Bs. Đỗ Quang Dũng",
          },
        ]}
      />
      <div className="staff-view mt-2">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </div>
  );
};

export default DoctorCalendar;
