import { Layout, Menu, MenuProps } from "antd";
import {
  Calendar,
  CalendarSearch,
  Grammerly,
  HomeTrendUp,
  Lamp,
  NoteAdd,
  Profile2User,
  Stickynote,
  User,
} from "iconsax-react";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

import Logo from "../assets/logo-transparent.png";
import { useSelector } from "react-redux";
import { AuthState } from "../models/AuthModels";

const SiderComponent = () => {
  const auth: AuthState = useSelector((state: any) => state.authReducer.data);

  // const location = useLocation();

  const managerItems: MenuProps["items"] = [
    {
      key: "dashboard",
      label: <Link to={"#"}>Bảng điều khiển</Link>,
      icon: <HomeTrendUp size={20} />,
    },
    {
      key: "manage-services",
      label: <Link to={"/manage-service"}>Danh sách dịch vụ</Link>,
      icon: <Lamp size={20} />,
    },
    {
      key: "manage-staffs",
      label: <Link to={"#"}>Danh sách nhân viên</Link>,
      icon: <Profile2User size={20} />,
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

  const doctorItems: MenuProps["items"] = [
    {
      key: "doctor-calendar",
      label: <Link to={"#"}>Lịch làm việc</Link>,
      icon: <Calendar size={20} />,
    },
    {
      key: "view-appointment",
      label: <Link to={"#"}>Xem cuộc hẹn</Link>,
      icon: <CalendarSearch size={20} />,
    },
    {
      key: "view-record",
      label: <Link to={"#"}>Hồ sơ khách hàng</Link>,
      icon: <Stickynote size={20} />,
    },
    {
      key: "create-record",
      label: <Link to={"#"}>Tạo hồ sơ bệnh án</Link>,
      icon: <NoteAdd size={20} />,
    },
    {
      key: "feedbacks",
      label: <Link to={"#"}>Phản hồi khách hàng</Link>,
      icon: <Grammerly size={20} />,
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

  const staffItems: MenuProps["items"] = [
    {
      key: "manager-doctor-calendar",
      label: <Link to={"#"}>Lịch làm việc của bác sĩ</Link>,
      icon: <Calendar size={20} />,
    },
    {
      key: "view-appointment",
      label: <Link to={"#"}>Cuộc hẹn khách hàng</Link>,
      icon: <CalendarSearch size={20} />,
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
          <img src={Logo} className="mx-auto w-20" alt="" />
          <h3 className="text-blue-primary text-2xl font-bold">GenKiKoi</h3>
        </div>
      </Link>
      <div className="flex h-[calc(100vh-160px)] flex-col justify-between">
        <Menu
          mode="inline"
          items={
            auth.role === "manager"
              ? managerItems
              : auth.role === "staff"
                ? staffItems
                : doctorItems
          }
          theme="light"
        />
        <p className="text-blue-primary text-center font-bold">
          © 2024 GenKiKoi
        </p>
      </div>
    </Sider>
  );
};

export default SiderComponent;
