import { Breadcrumb, message, Spin } from "antd";
import { Calendar } from "iconsax-react";
import { Link, useLocation } from "react-router-dom";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
} from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";

const DoctorCalendar = () => {
  const { pathname } = useLocation();
  const doctorId = pathname.split("/")[3];
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [doctorName, setDoctorName] = useState<string>("");

  const calendar = useCalendarApp({
    views: [createViewWeek(), createViewDay(), createViewMonthGrid()],
    dayBoundaries: {
      start: "07:00",
      end: "22:00",
    },
    plugins: [createEventModalPlugin()],
  });

  useEffect(() => {
    const getSchedule = async () => {
      const api = `/api/doctorSchedules/${doctorId}/view-calendar`;
      try {
        setIsLoading(true);
        const res = await handleAPI(api, undefined, "GET");
        setEvents(res.data.schedules);
        setDoctorName(res.data.doctorName);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getSchedule();
  }, [doctorId]);

  useEffect(() => {
    if (events && events.length > 0) {
      events.forEach((event) => {
        calendar.events.add(event);
      });
    }
  }, [events]);

  if (isLoading) {
    return (
      <div className="section flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="section">
      <Breadcrumb
        separator=">"
        items={[
          {
            title: (
              <Link to="/manager/doctor-calendar">
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  Lịch làm việc của bác sĩ
                </div>
              </Link>
            ),
          },
          {
            title: <Link to="/manager/doctor-calendar">Danh sách bác sĩ</Link>,
          },
          {
            title: `Bs. ${doctorName}`,
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
