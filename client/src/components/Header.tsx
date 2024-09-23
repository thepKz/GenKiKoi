import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { Button, Dropdown, MenuProps } from "antd";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link to="services/consulting-treatment">Tư vấn & Điều trị</Link>,
  },
  {
    key: "2",
    label: <Link to="#">Tiêm ngừa</Link>,
  },
  {
    key: "3",
    label: <Link to="#">Kiểm tra chất lượng nước</Link>,
  },
];

const Header = () => {
  return (
    <header className="fixed z-50 w-full bg-blue-primary shadow-lg">
      <div className="container mx-auto lg:px-40">
        <div className="flex items-center justify-between">
          <div className="h-20 w-20">
            <Link to={"/"}>
              <img
                src={Logo}
                alt=""
              />
            </Link>
          </div>
          <ul className="flex items-center gap-8 text-white">
            <div className="link">
              <Link
                className=""
                to={"/"}
              >
                Trang chủ
              </Link>
              <div className="h-[1.5px] bg-white duration-300 ease-in" />
            </div>
            <Dropdown menu={{ items }}>
              <div className="link">
                <Link
                  className=""
                  to={"/services"}
                >
                  Dịch vụ
                </Link>
                <div className="h-[1.5px] bg-white duration-300 ease-in" />
              </div>
            </Dropdown>

            <div className="link">
              <Link
                className=""
                to={"/images"}
              >
                Hình ảnh
              </Link>
              <div className="h-[1.5px] bg-white duration-300 ease-in" />
            </div>
            <div className="link">
              <Link
                className=""
                to={"/doctors"}
              >
                Bác sĩ
              </Link>
              <div className="h-[1.5px] bg-white duration-300 ease-in" />
            </div>

            <div className="link">
              <Link
                className=""
                to={"/about-us"}
              >
                Giới thiệu
              </Link>
              <div className="h-[1.5px] bg-white duration-300 ease-in" />
            </div>

            <div className="link">
              <Link
                className=""
                to={"/faq"}
              >
                Hỏi & Đáp
              </Link>
              <div className="h-[1.5px] bg-white duration-300 ease-in" />
            </div>
          </ul>
          <div className="flex items-center gap-3">
            <Button
              size="large"
              ghost
            >
              <Link to={"/sign-in"}>Đăng nhập</Link>
            </Button>
            <Button
              size="large"
              type="primary"
            >
              <Link to={"/sign-up"}>Đăng ký</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
