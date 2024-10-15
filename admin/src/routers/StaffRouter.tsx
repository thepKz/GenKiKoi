import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts";
import { NotFound } from "../pages/notfound";
import { AssignCalendar, DoctorCalendar, ListDoctors } from "../pages/staff";

const StaffRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to={"doctor-calendar"} replace />} />
        <Route path="doctor-calendar" element={<ListDoctors />} />
        <Route path="doctor-calendar/:id" element={<DoctorCalendar />} />
        <Route path="doctor-calendar/assign/:id" element={<AssignCalendar />} />
      </Route>
      <Route path="*" element={<NotFound to="/staff" />} />
    </Routes>
  );
};

export default StaffRouter;
