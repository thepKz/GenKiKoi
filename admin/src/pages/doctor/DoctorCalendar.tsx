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
import { message } from "antd";

const DoctorCalendar = () => {
  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getSchedule = async () => {
      const api = `/api/doctors/schedule/${auth.id}`;
      try {
        setIsLoading(true);
        const res = await handleAPI(api, undefined, "GET");
        const formattedEvents = res.data.map((event: any, index: number) => ({
          id: index + 1,
          title: event.title,
          start: formatDate(event.start),
          end: formatDate(event.end),
          description: event.description,
        }));
        setEvents(formattedEvents);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getSchedule();
  }, [auth.id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().replace("T", " ").slice(0, -8);
  };

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
    return <div>Loading</div>;
  }

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
