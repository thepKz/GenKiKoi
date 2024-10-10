import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { HeaderComponent, SiderComponent } from "../components";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout>
      <SiderComponent />
      <Layout>
        <HeaderComponent />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;