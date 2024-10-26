import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
} from "@schedule-x/calendar";

import "@schedule-x/theme-default/dist/index.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";
import { IAuth } from "../../types";
import { useSelector } from "react-redux";
import { message, Spin } from "antd";

const DoctorCalendar = () => {
  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getSchedule = async () => {
      const api = `/api/doctorSchedules/${auth.adminId}/view-calendar`;
      try {
        setIsLoading(true);
        const res = await handleAPI(api, undefined, "GET");
        setEvents(res.data.schedules);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getSchedule();
  }, [auth.adminId]);

  const calendar = useCalendarApp({
    views: [createViewWeek(), createViewDay(), createViewMonthGrid()],
    dayBoundaries: {
      start: "07:00",
      end: "22:00",
    },
    plugins: [createEventModalPlugin()],
  });

  useEffect(() => {
    if (events && events.length > 0) {
      events.forEach((event) => {
        calendar.events.add(event);
      });
    }
  }, [events]);

  if (isLoading) {
    return (
      <div className="container mx-auto my-5 flex h-screen items-center justify-center rounded-md bg-white p-5 shadow-sm lg:w-[95%]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="section">
      <div className="doctor-view">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </div>
  );
};

export default DoctorCalendar;
