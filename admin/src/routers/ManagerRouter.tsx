import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts";
import {
  Accounts,
  Appointments,
  AssignCalendar,
  Customers,
  Dashboard,
  DoctorCalendar,
  ListDoctors,
  Profile,
  Services,
  Staffs,
} from "../pages/manager";
import { NotFound } from "../pages/notfound";

const ManagerRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
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
        <Route path="accounts">
          <Route index element={<Accounts />} />
        </Route>
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound to="/" />} />
    </Routes>
  );
};

export default ManagerRouter;
