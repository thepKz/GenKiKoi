import { Avatar, Badge, Button, Dropdown, MenuProps } from "antd";
import { CalendarEdit, Logout, Notification, User } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { removeAuth } from "../redux/reducers/authReducer";
import { IAuth } from "../types";

const Header = () => {
  const auth: IAuth = useSelector((state: any) => state.authReducer.data);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Mục đích ???
  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(path);
    }
  };

  const services: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          className="cursor-pointer"
          onClick={(e) => handleNavClick(e, "/services/consulting-treatment")}
        >
          Tư vấn & Điều trị
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          className="cursor-pointer"
          onClick={(e) => handleNavClick(e, "/services/vaccine")}
        >
          Tiêm ngừa
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          className="cursor-pointer"
          onClick={(e) => handleNavClick(e, "/services/water-quality")}
        >
          Kiểm tra chất lượng nước
        </a>
      ),
    },
  ];

  const profile: MenuProps["items"] = [
    {
      key: "1",
      icon: <User size={18} />,
      label: (
        <a
          className="cursor-pointer"
          onClick={(e) => handleNavClick(e, "/my-account/appointment")}
        >
          Tài khoản
        </a>
      ),
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
            <a
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
            >
              <img
                src={Logo}
                alt=""
              />
            </a>
          </div>
          <ul className="flex items-center gap-8 text-white">
            <div className="link cursor-pointer">
              <a
                className=""
                href="/"
                onClick={(e) => handleNavClick(e, "/")}
              >
                Trang chủ
              </a>
              <div className="h-[1.5px] bg-white duration-300 ease-in" />
            </div>
            <Dropdown menu={{ items: services }}>
              <div className="link cursor-pointer">
                <a
                  className=""
                  onClick={(e) => handleNavClick(e, "/services")}
                >
                  Dịch vụ
                </a>
                <div className="h-[1.5px] bg-white duration-300 ease-in" />
              </div>
            </Dropdown>

            <div className="link cursor-pointer">
              <a
                className=""
                onClick={(e) => handleNavClick(e, "/images")}
              >
                Hình ảnh
              </a>
              <div className="h-[1.5px] bg-white duration-300 ease-in" />
            </div>
            <div className="link cursor-pointer">
              <a
                className=""
                onClick={(e) => handleNavClick(e, "/doctors")}
              >
                Bác sĩ
              </a>
              <div className="h-[1.5px] bg-white duration-300 ease-in" />
            </div>

            <div className="link cursor-pointer">
              <a
                className=""
                onClick={(e) => handleNavClick(e, "/about-us")}
              >
                Giới thiệu
              </a>
              <div className="h-[1.5px] bg-white duration-300 ease-in" />
            </div>

            <div className="link cursor-pointer">
              <a
                className=""
                onClick={(e) => handleNavClick(e, "/faq")}
              >
                Hỏi & Đáp
              </a>
              <div className="h-[1.5px] bg-white duration-300 ease-in" />
            </div>
          </ul>
          {!auth.token ? (
            <div className="flex items-center gap-3">
              <Button
                size="large"
                ghost
              >
                <Link
                  to="/sign-in"
                  className="cursor-pointer"
                >
                  Đăng nhập
                </Link>
              </Button>
              <Button
                size="large"
                type="primary"
              >
                <Link
                  to="/sign-up"
                  className="cursor-pointer"
                >
                  Đăng ký
                </Link>
              </Button>
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
                <Button
                  size="large"
                  ghost
                >
                  Xác nhận tài khoản
                </Button>
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
