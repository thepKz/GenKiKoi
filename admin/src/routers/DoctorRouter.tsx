import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts";
import { NotFound } from "../pages/notfound";
import { DoctorCalendar } from "../pages/doctor";

const DoctorRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="calendar" replace />} />
        <Route path="calendar" element={<DoctorCalendar />} />
      </Route>
      <Route path="*" element={<NotFound to="/doctor" />} />
    </Routes>
  );
};

export default DoctorRouter;
