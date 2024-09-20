import { Outlet } from "react-router-dom";
import { Header } from "../components";
import { Divider } from "antd";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Divider
        style={{
          margin: "0px",
        }}
      />
      <Outlet />
    </div>
  );
};

export default MainLayout;
