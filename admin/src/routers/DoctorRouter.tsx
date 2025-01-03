import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts";
import { NotFound } from "../pages/notfound";
import {
  Appointments,
  CreateRecord,
  DoctorCalendar,
  Feedback,
  ListFishes,
  ListFishRecords,
  ListPonds,
  PondDetail,
  Profile,
  RecordDetail,
  Records,
} from "../pages/doctor";
import ChangePassword from "../pages/ChangePassword";

const DoctorRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="calendar" replace />} />
        <Route path="calendar" element={<DoctorCalendar />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="customers">
          <Route index element={<Records />} />
          <Route path=":userId/fishes">
            <Route index element={<ListFishes />} />
            <Route path=":fishId/records">
              <Route index element={<ListFishRecords />} />
              <Route path=":recordId" element={<RecordDetail />} />
            </Route>
          </Route>
          <Route path=":userId/ponds">
            <Route index element={<ListPonds />} />
            <Route path=":pondId/records">
              <Route index element={<PondDetail />} />
            </Route>
          </Route>
        </Route>
        <Route path="create-records" element={<CreateRecord />} />
        <Route path="feedbacks" element={<Feedback />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="change-password" element={<ChangePassword />} />
      <Route path="*" element={<NotFound to="/doctor" />} />
    </Routes>
  );
};

export default DoctorRouter;
