import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts";
import { NotFound } from "../pages/notfound";

const DoctorRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="*" element={<NotFound to="/doctor" />} />
    </Routes>
  );
};

export default DoctorRouter;
