import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts";
import { Services, Staffs } from "../pages/manager";
import { NotFound } from "../pages/notfound";

const ManagerRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="manage-services" element={<Services />} />
          <Route path="manage-staffs" element={<Staffs />} />
        </Route>
        <Route path="*" element={<NotFound to="/manage-services" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ManagerRouter;
