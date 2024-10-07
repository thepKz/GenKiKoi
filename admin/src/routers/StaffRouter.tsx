import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts";

const StaffRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default StaffRouter;
