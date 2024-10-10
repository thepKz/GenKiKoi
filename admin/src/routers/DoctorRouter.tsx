import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts";
import { NotFound } from "../pages/notfound";

const DoctorRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="*" element={<NotFound to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default DoctorRouter;
