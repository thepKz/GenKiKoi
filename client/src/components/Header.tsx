import { Avatar, Button, Dropdown, MenuProps } from "antd";
import { CalendarEdit, CloseCircle, Logout, Menu, User } from "iconsax-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { removeAuth } from "../redux/reducers/authReducer";
import { IAuth } from "../types";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    {
      key: "4",
      label: <Link to={"/services/service-price-table"}>Bảng giá dịch vụ</Link>,
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
    <header className="fixed z-50 w-full bg-blue-primary/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0"
          >
            <img
              src={Logo}
              alt="GenKiKoi"
              className="h-10 w-10 object-contain transition-transform hover:scale-105 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:flex-1 lg:justify-center">
            <ul className="flex items-center space-x-8">
              <NavLink to="/">Trang chủ</NavLink>
              <Dropdown
                menu={{ items: services }}
                placement="bottom"
                overlayClassName="min-w-[200px]"
                overlayStyle={{ marginTop: "12px" }}
              >
                <div className="group">
                  <Link
                    to="/services"
                    className="flex items-center text-white transition-colors hover:text-blue-200"
                  >
                    Dịch vụ
                  </Link>
                  <div className="h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </div>
              </Dropdown>
              <NavLink to="/images">Hình ảnh</NavLink>
              <NavLink to="/doctors">Bác sĩ</NavLink>
              <NavLink to="/about-us">Giới thiệu</NavLink>
              <NavLink to="/faq">Hỏi & Đáp</NavLink>
              <NavLink to="/terms-of-service">Điều khoản dịch vụ</NavLink>
            </ul>
          </nav>

          {/* Auth Section */}
          <div className="hidden items-center space-x-4 lg:flex">
            {!auth.token ? (
              <div className="flex items-center space-x-3">
                <Link to="/sign-in">
                  <Button
                    ghost
                    size="large"
                    className="transition-colors hover:bg-white hover:text-blue-primary"
                  >
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button
                    type="primary"
                    size="large"
                    className="bg-white text-blue-primary hover:bg-blue-50"
                  >
                    Đăng ký
                  </Button>
                </Link>
              </div>
            ) : (
              <UserMenu
                auth={auth}
                profile={profile}
              />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"} `}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-[280px] transform bg-blue-primary transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"} `}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Link
            to="/"
            className="flex-shrink-0"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src={Logo}
              alt="GenKiKoi"
              className="h-10 w-10"
            />
          </Link>
          <button
            className="rounded-full p-2 text-white transition-colors hover:bg-white/10"
            onClick={() => setIsMenuOpen(false)}
          >
            <CloseCircle size={24} />
          </button>
        </div>

        <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-blue-primary px-4 pb-6 opacity-85">
          <nav className="space-y-1 pt-4">
            <MobileNavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Trang chủ
            </MobileNavLink>
            <Dropdown
              menu={{ items: services }}
              trigger={["click"]}
              overlayStyle={{ width: "240px" }}
            >
              <div className="flex cursor-pointer items-center rounded-lg px-4 py-3 text-base font-medium text-white hover:bg-white/10">
                Dịch vụ
              </div>
            </Dropdown>
            <MobileNavLink
              to="/images"
              onClick={() => setIsMenuOpen(false)}
            >
              Hình ảnh
            </MobileNavLink>
            <MobileNavLink
              to="/doctors"
              onClick={() => setIsMenuOpen(false)}
            >
              Bác sĩ
            </MobileNavLink>
            <MobileNavLink
              to="/about-us"
              onClick={() => setIsMenuOpen(false)}
            >
              Giới thiệu
            </MobileNavLink>
            <MobileNavLink
              to="/faq"
              onClick={() => setIsMenuOpen(false)}
            >
              Hỏi & Đáp
            </MobileNavLink>
            <MobileNavLink
              to="/terms-of-service"
              onClick={() => setIsMenuOpen(false)}
            >
              Điều khoản dịch vụ
            </MobileNavLink>
          </nav>

          {/* Mobile Auth */}
          <div className="mt-6 border-t border-white/10 pt-6">
            {!auth.token ? (
              <div className="grid gap-3">
                <Link
                  to="/sign-in"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    ghost
                    block
                    size="large"
                  >
                    Đăng nhập
                  </Button>
                </Link>
                <Link
                  to="/sign-up"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    type="primary"
                    block
                    size="large"
                  >
                    Đăng ký
                  </Button>
                </Link>
              </div>
            ) : (
              <UserMenu
                auth={auth}
                profile={profile}
                mobile
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li className="group">
    <Link
      to={to}
      className="flex items-center text-white transition-colors hover:text-blue-200"
    >
      {children}
    </Link>
    <div className="h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
  </li>
);

const MobileNavLink = ({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center rounded-lg px-4 py-3 text-base font-medium text-white transition-colors hover:bg-white/10"
  >
    {children}
  </Link>
);

const UserMenu = ({
  auth,
  profile,
  mobile,
}: {
  auth: IAuth;
  profile: MenuProps["items"];
  mobile?: boolean;
}) => (
  <div className={`flex items-center gap-3 ${mobile ? "flex-col" : ""}`}>
    {auth.isVerified ? (
      <Link to="/booking">
        <CalendarEdit
          color="white"
          size={24}
        />
      </Link>
    ) : (
      <Link to="/verify-account">
        <Button
          size="large"
          ghost
          block={mobile}
        >
          Xác nhận tài khoản
        </Button>
      </Link>
    )}
    <Dropdown
      menu={{ items: profile }}
      placement="bottomRight"
    >
      <Avatar
        src={auth.photoUrl}
        className="cursor-pointer"
        icon={<User size={18} />}
      />
    </Dropdown>
  </div>
);

export default Header;
