import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts";
import {
  Appointments,
  AssignCalendar,
  Customers,
  DoctorCalendar,
  ListDoctors,
  Services,
  Staffs,
} from "../pages/manager";
import { NotFound } from "../pages/notfound";

const ManagerRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="services" replace />} />
        <Route path="services" element={<Services />} />
        <Route path="staffs" element={<Staffs />} />
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
      </Route>
      <Route path="*" element={<NotFound to="/" />} />
    </Routes>
  );
};

export default ManagerRouter;
