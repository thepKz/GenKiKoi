import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts";
import { Services, Staffs } from "../pages/manager";

const ManagerRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="manage-services" element={<Services />} />
          <Route path="manage-staffs" element={<Staffs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default ManagerRouter;
