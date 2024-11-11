import { Avatar, Layout, Menu, MenuProps } from "antd";
import { DocumentLike, DocumentText, Home2, Logout, User } from "iconsax-react";
import { VscHistory } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

import Logo from "../assets/logo-transparent.png";
import { useDispatch, useSelector } from "react-redux";
import { IAuth } from "../types";
import { removeAuth } from "../redux/reducers/authReducer";

const SiderComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

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
      icon: (
        <Avatar
          icon={
            <User
              size={16}
              color="white"
            />
          }
          src={auth.photoUrl}
        />
      ),
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
        <div>
          <div
            className="m-1 rounded-md px-6 py-[10px] transition-colors duration-150 ease-in hover:bg-[#f0f0f0]"
            onClick={() => dispatch(removeAuth({}))}
          >
            <div className="flex items-center justify-center gap-2">
              <Logout size={20} />
              <span>Đăng xuất</span>
            </div>
          </div>
          <p className="text-center font-bold text-blue-primary">© 2024 GenKiKoi</p>
        </div>
      </div>
    </Sider>
  );
};

export default SiderComponent;
