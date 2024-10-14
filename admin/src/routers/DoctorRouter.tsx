import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts";
import { NotFound } from "../pages/notfound";
import {
  Appointments,
  CreateRecord,
  DoctorCalendar,
  RecordDetail,
  Records,
} from "../pages/doctor";

const DoctorRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="calendar" replace />} />
        <Route path="calendar" element={<DoctorCalendar />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="view-records" element={<Records />} />
        <Route path="view-records/:id" element={<RecordDetail />} />
        <Route path="create-records" element={<CreateRecord />} />
      </Route>
      <Route path="*" element={<NotFound to="/doctor" />} />
    </Routes>
  );
};

export default DoctorRouter;
