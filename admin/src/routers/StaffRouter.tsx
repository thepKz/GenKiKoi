import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts";
import { NotFound } from "../pages/notfound";
import {
  Appointments,
  AssignCalendar,
  Booking,
  Customers,
  DoctorCalendar,
  ListDoctors,
  Profile,
} from "../pages/staff";

const StaffRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to={"doctor-calendar"} replace />} />
        <Route path="doctor-calendar">
          <Route index element={<ListDoctors />} />
          <Route path=":id" element={<DoctorCalendar />} />
          <Route path="assign/:id" element={<AssignCalendar />} />
        </Route>
        <Route path="customers">
          <Route index element={<Customers />} />
          <Route path=":userId/appointments">
            <Route index element={<Appointments />} />
          </Route>
        </Route>
        <Route path="booking" element={<Booking />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound to="/staff" />} />
    </Routes>
  );
};

export default StaffRouter;
