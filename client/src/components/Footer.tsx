import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { Happyemoji, Map, Pet } from "iconsax-react";

const Footer = () => {
  return (
    <div className="section bg-blue-primary text-center text-white">
      <div className="container mx-auto lg:px-40">
        <div className="flex">
          <div className="w-1/4">
            <img
              className="mx-auto w-1/2"
              src={Logo}
              alt=""
            />
          </div>
          <div className="flex flex-1 gap-10">
            <div className="">
              <div className="text-left">
                <div className="mb-2 flex items-center gap-2">
                  <Happyemoji />
                  <h3 className="font-bold">Về phòng khám</h3>
                </div>
                <ul className="ml-9 flex flex-col gap-2">
                  <Link
                    className="transition-colors duration-150 ease-in hover:text-blue-secondary"
                    to={"#"}
                  >
                    Giới thiệu
                  </Link>
                  <Link
                    className="transition-colors duration-150 ease-in hover:text-blue-secondary"
                    to={"#"}
                  >
                    Chọn GenKiKoi
                  </Link>
                  <Link
                    className="transition-colors duration-150 ease-in hover:text-blue-secondary"
                    to={"#"}
                  >
                    Hình ảnh hoạt động
                  </Link>
                  <Link
                    className="transition-colors duration-150 ease-in hover:text-blue-secondary"
                    to={"#"}
                  >
                    Liên hệ
                  </Link>
                </ul>
              </div>
            </div>
            <div className="">
              <div className="text-left">
                <div className="mb-2 flex items-center gap-2">
                  <Pet />
                  <h3 className="font-bold">Dịch vụ</h3>
                </div>
                <ul className="ml-9 flex flex-col gap-2">
                  <Link
                    className="transition-colors duration-150 ease-in hover:text-blue-secondary"
                    to={"#"}
                  >
                    Tư vấn & Điều trị
                  </Link>
                  <Link
                    className="transition-colors duration-150 ease-in hover:text-blue-secondary"
                    to={"#"}
                  >
                    Xét nghiệm
                  </Link>
                  <Link
                    className="transition-colors duration-150 ease-in hover:text-blue-secondary"
                    to={"#"}
                  >
                    Ký sinh trùng máu
                  </Link>
                  <Link
                    className="transition-colors duration-150 ease-in hover:text-blue-secondary"
                    to={"#"}
                  >
                    Kháng sinh đồ
                  </Link>
                  <Link
                    className="transition-colors duration-150 ease-in hover:text-blue-secondary"
                    to={"#"}
                  >
                    Siêu âm
                  </Link>
                  <Link
                    className="transition-colors duration-150 ease-in hover:text-blue-secondary"
                    to={"#"}
                  >
                    Phẫu thuật
                  </Link>
                  <Link
                    className="transition-colors duration-150 ease-in hover:text-blue-secondary"
                    to={"#"}
                  >
                    Tiêm ngừa
                  </Link>
                  <Link
                    className="transition-colors duration-150 ease-in hover:text-blue-secondary"
                    to={"#"}
                  >
                    Pet Shop
                  </Link>
                </ul>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-left">
                <div className="mb-2 flex items-center gap-2">
                  <Map />
                  <h3 className="font-bold">Google Maps</h3>
                </div>
                <img
                  className="ml-9 rounded-md"
                  src={"https://placehold.co/430x240?text=Google%20Map"}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 text-left">
          <h3>© 2023 Phòng khám Thú Y GenKiKoi</h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;
