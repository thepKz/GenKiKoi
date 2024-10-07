import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts";
import { Services } from "../pages";

const ManagerRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/manage-service" element={<Services />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default ManagerRouter;
