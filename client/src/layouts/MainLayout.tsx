import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { DividerComponent } from "../share";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <DividerComponent />
      <Footer />
    </div>
  );
};

export default MainLayout;
