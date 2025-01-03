import { Happyemoji, Map, Pet } from "iconsax-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";

const Footer = () => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current) return;

      const lat = 10.8411;
      const lon = 106.809;
      const map = L.map("map").setView([lat, lon], 15);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "",
      }).addTo(map);

      const genkikoiIcon = L.icon({
        iconUrl: Logo,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      L.marker([lat, lon], { icon: genkikoiIcon }).addTo(map).bindPopup("GenKiKoi").openPopup();
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <footer className="section relative z-20 bg-blue-primary py-8 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          {/* Cột 1: Thông tin phòng khám */}
          <div className="mb-6 w-full md:mb-0 md:w-1/5">
            <div className="mb-4 flex items-center">
              <img
                src={Logo}
                alt="GenKiKoi Logo"
                className="mr-2 h-12 w-12"
              />
              <div>
                <h2 className="text-xl font-bold">Phòng khám Thú Y</h2>
                <h1 className="text-2xl font-bold">GenKiKoi</h1>
              </div>
            </div>
          </div>

          {/* Cột 2: Về Phòng Khám và Dịch Vụ */}
          <div className="mb-6 mr-4 w-full md:mb-0 md:w-1/4">
            <div className="flex">
              <div className="w-1/2">
                <h3 className="mb-4 flex items-center text-lg font-bold">
                  <Happyemoji className="mr-2" /> Về Phòng Khám
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/about-us"
                      className="transition-colors hover:text-blue-300"
                    >
                      Giới thiệu
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/images"
                      className="transition-colors hover:text-blue-300"
                    >
                      Hình ảnh hoạt động
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/faq"
                      className="transition-colors hover:text-blue-300"
                    >
                      Hỏi đáp
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/doctors"
                      className="transition-colors hover:text-blue-300"
                    >
                      Bác sĩ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms-of-service"
                      className="transition-colors hover:text-blue-300"
                    >
                      Điều khoản dịch vụ
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-1/2">
                <h3 className="mb-4 flex items-center text-lg font-bold">
                  <Pet className="mr-2" /> Dịch Vụ
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/services/consulting-treatment"
                      className="transition-colors hover:text-blue-300"
                    >
                      Tư vấn & Điều trị
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/vaccine"
                      className="transition-colors hover:text-blue-300"
                    >
                      Tiêm ngừa
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/water-quality"
                      className="transition-colors hover:text-blue-300"
                    >
                      Kiểm tra chất lượng nước
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/service-price-table"
                      className="transition-colors hover:text-blue-300"
                    >
                      Bảng giá dịch vụ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cột 3: Google Maps */}
          <div className="w-full md:w-1/3">
            <h3 className="mb-4 flex items-center text-lg font-bold">
              <Map className="mr-2" /> Google Maps
            </h3>
            <div
              id="map"
              className="mb-2 h-80 w-full rounded-md"
            ></div>
            <button
              className="mt-2 w-full rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=FPT+University+Ho+Chi+Minh+City`,
                  "_blank",
                )
              }
            >
              Xem bản đồ lớn
            </button>
          </div>
        </div>

        {/* Copyright và Social Icons */}
        <div className="mt-8 border-t border-blue-400 pt-8">
          <div className="flex items-center justify-center">
            <p>© 2024 Phòng khám Thú Y GenKiKoi. Tất cả các quyền được bảo lưu.</p>
            <div className="flex space-x-4">{/* Add your social icons here */}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
