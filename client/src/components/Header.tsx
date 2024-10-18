import { Avatar, Badge, Button, Dropdown, MenuProps } from "antd";
import { CalendarEdit, Logout, Notification, User } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { removeAuth } from "../redux/reducers/authReducer";
import { IAuth } from "../types";

const Header = () => {
  const auth: IAuth = useSelector((state: any) => state.authReducer.data);
  const dispatch = useDispatch();

  const services: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to="/services/consulting-treatment">Tư vấn & Điều trị</Link>,
    },
    {
      key: "2",
      label: <Link to={"/services/vaccine"}>Tiêm ngừa</Link>,
    },
    {
      key: "3",
      label: <Link to={"/services/water-quality"}>Kiểm tra chất lượng nước</Link>,
    },
  ];

  const profile: MenuProps["items"] = [
    {
      key: "1",
      icon: <User size={18} />,
      label: <Link to="/my-account/appointment">Tài khoản</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Đăng xuất",
      icon: <Logout size={18} />,
      onClick: () => dispatch(removeAuth({})),
    },
  ];

  return (
    <header className="fixed z-50 w-full bg-blue-primary shadow-lg">
      <div className="container mx-auto lg:px-40">
        <div className="flex items-center justify-between">
          <div className="h-20 w-20 cursor-pointer">
            <Link to={"/"}>
              <img
                src={Logo}
                alt=""
              />
            </Link>
          </div>
          <ul className="flex items-center gap-8 text-white">
            <div className="link cursor-pointer">
              <Link to={"/"}>Trang chủ</Link>
              <div className="h-[1.5px] bg-white duration-300 ease-in" />
            </div>
            <Dropdown menu={{ items: services }}>
              <div className="link cursor-pointer">
                <Link to="/services">Dịch vụ</Link>
                <div className="h-[1.5px] bg-white duration-300 ease-in" />
              </div>
            </Dropdown>

            <div className="link cursor-pointer">
              <Link to="/images">Hình ảnh</Link>
              <div className="h-[1.5px] bg-white duration-300 ease-in" />
            </div>
            <div className="link cursor-pointer">
              <Link to="/doctors">Bác sĩ</Link>
              <div className="h-[1.5px] bg-white duration-300 ease-in" />
            </div>

            <div className="link cursor-pointer">
              <Link to="/about-us">Giới thiệu</Link>
              <div className="h-[1.5px] bg-white duration-300 ease-in" />
            </div>

            <div className="link cursor-pointer">
              <Link to="/faq">Hỏi & Đáp</Link>
              <div className="h-[1.5px] bg-white duration-300 ease-in" />
            </div>
          </ul>
          {!auth.token ? (
            <div className="flex items-center gap-3">
              <Link
                to="/sign-in"
                className="cursor-pointer"
              >
                <Button
                  size="large"
                  ghost
                >
                  Đăng nhập
                </Button>
              </Link>
              <Link
                to="/sign-up"
                className="cursor-pointer"
              >
                <Button
                  size="large"
                  type="primary"
                >
                  Đăng ký
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {auth.isVerified ? (
                <Link
                  to="/booking"
                  className="cursor-pointer"
                >
                  <CalendarEdit
                    color="white"
                    size={24}
                  />
                </Link>
              ) : (
                <Link
                  to="/verify-account"
                  className="cursor-pointer"
                >
                  <Button
                    size="large"
                    ghost
                  >
                    Xác nhận tài khoản
                  </Button>
                </Link>
              )}
              <Badge
                count={9}
                size="small"
                offset={[-4, 3]}
              >
                <Notification
                  className="cursor-pointer"
                  color="white"
                />
              </Badge>
              <Dropdown menu={{ items: profile }}>
                <Avatar
                  src={auth.photoUrl}
                  className="cursor-pointer"
                  icon={<User size={18} />}
                />
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
