import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts";
import { Services, Staffs } from "../pages/manager";
import { NotFound } from "../pages/notfound";

const ManagerRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="services" replace />} />
        <Route path="services" element={<Services />} />
        <Route path="staffs" element={<Staffs />} />
      </Route>
      <Route path="*" element={<NotFound to="/" />} />
    </Routes>
  );
};

export default ManagerRouter;
