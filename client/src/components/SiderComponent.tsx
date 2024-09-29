import { Layout, Menu, MenuProps, Typography } from "antd";
import { DocumentLike, DocumentText, Home2, User } from "iconsax-react";
import { VscHistory } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

import Logo from "../assets/logo-transparent.png";

const SiderComponent = () => {
  const location = useLocation();

  const items: MenuProps["items"] = [
    {
      key: "appointment",
      label: <Link to={"/my-account/appointment"}>Danh sách cuộc hẹn</Link>,
      icon: <Home2 size={20} />,
    },
    {
      key: "medical-record",
      label: <Link to={"/my-account/medical-record"}>Hồ sơ điều trị</Link>,
      icon: <DocumentLike size={20} />,
    },
    {
      key: "inspection-record",
      label: <Link to={"/my-account/inspection-record"}>Hồ sơ kiểm định</Link>,
      icon: <DocumentText size={20} />,
    },
    {
      key: "history",
      label: <Link to={"/my-account/history"}>Lịch sử thanh toán</Link>,
      icon: <VscHistory size={20} />,
    },
    {
      key: "divider",
      type: "divider",
    },
    {
      key: "profile",
      label: <Link to={"/my-account/profile"}>Hồ sơ cá nhân</Link>,
      icon: <User size={20} />,
    },
  ];

  return (
    <Sider
      width="15%"
      theme="light"
      style={{
        height: "100vh",
        marginRight: 3,
      }}
      className="shadow-sm"
    >
      <Link to={"/"}>
        <div className="py-5 text-center">
          <img
            src={Logo}
            className="mx-auto w-20"
            alt=""
          />
          <h3 className="text-2xl font-bold text-blue-primary">GenKiKoi</h3>
        </div>
      </Link>
      <div className="flex h-[calc(100vh-160px)] flex-col justify-between">
        <Menu
          mode="inline"
          items={items}
          theme="light"
          selectedKeys={
            [items.find((item) => item?.key === location.pathname.split("/")[2])?.key] as string[]
          }
        />
        <p className="text-center font-bold text-blue-primary">© 2024 GenKiKoi</p>
      </div>
    </Sider>
  );
};

export default SiderComponent;
