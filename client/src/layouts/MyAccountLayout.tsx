import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { SiderComponent } from "../components";

const { Content } = Layout;

const MyAccountLayout = () => {
  return (
    <Layout>
      <SiderComponent />
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyAccountLayout;
