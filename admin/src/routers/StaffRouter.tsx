import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts";

const StaffRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
    </Routes>
  );
};

export default StaffRouter;
