import { Happyemoji, Map, Pet } from "iconsax-react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";


const Footer = () => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current) return;

      const lat = 10.8411;
      const lon = 106.8090;
      const map = L.map('map').setView([lat, lon], 15);
      mapRef.current = map;
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ''
      }).addTo(map);
      
      const genkikoiIcon = L.icon({
        iconUrl: Logo,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      // Thêm icons cho Hoàng Sa và Trường Sa
      const hoangSaIcon = L.icon({
        iconUrl: '/src/assets/hoangsa.png',
        iconSize: [100, 100],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const truongSaIcon = L.icon({
        iconUrl: '/src/assets/truongsa.png',
        iconSize: [100, 100],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });
      
      // Marker cho GenKiKoi
      L.marker([lat, lon], { icon: genkikoiIcon }).addTo(map)
        .bindPopup('GenKiKoi')
        .openPopup();

      // Thêm markers cho Hoàng Sa và Trường Sa
      L.marker([16.4, 112.0], { icon: hoangSaIcon }).addTo(map)
        .bindPopup('Quần đảo Hoàng Sa');
      
      L.marker([8.6, 111.9], { icon: truongSaIcon }).addTo(map)
        .bindPopup('Quần đảo Trường Sa');
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);
  const footerLinks1 = [
    { name: "Giới thiệu", path: "/about-us" },
    { name: "Chọn GenKiKoi", path: "/" },
    { name: "Hình ảnh hoạt động", path: "/images" },
    { name: "Đặt lịch khám", path: "/booking" },
    { name: "Chính sách", path: "/terms-of-service" }
    
  ];
  const footerLinks2 = [
    { name: "Tư vấn & Điều trị", path: "/services/consulting-treatment" },
    { name: "Kiểm tra chất lượng nước", path: "/services/water-quality" },
    { name: "Tiêm ngừa", path: "/services/vaccine" },
    { name: "Siêu âm", path: "#" },
    { name: "Bảng giá dịch vụ", path: "/services/service-price-table" }

  ];

  return (

    <footer className="section bg-blue-primary text-white py-8 relative z-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          {/* Cột 1: Thông tin phòng khám */}
          <div className="w-full md:w-1/5 mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <img src={Logo} alt="GenKiKoi Logo" className="w-12 h-12 mr-2" />
              <div>
                <h2 className="text-lg font-bold">Phòng khám Thú Y</h2>
                <h1 className="text-2xl font-bold">GenKiKoi</h1>
              </div>
            </div>
          </div>

          {/* Cột 2: Về Phòng Khám và Dịch Vụ */}
          {/* <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <div className="flex"> */}
              <div className="w-full md:w-1/5 mb-6 md:mb-0">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <Happyemoji className="mr-2" /> Về Phòng Khám
                </h3>
                <ul className="space-y-2">
                  {footerLinks1.map((item) => (
                    <li key={item.name}>
                      <Link to={item.path} className="hover:text-blue-300 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/5 mb-6 md:mb-0">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <Pet className="mr-2" /> Dịch Vụ
                </h3>
                <ul className="space-y-2">
                {footerLinks2.map((item) => (
                    <li key={item.name}>
                      <Link to={item.path} className="hover:text-blue-300 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            {/* </div>
          </div> */}

          {/* Cột 3: Google Maps */}
          <div className="w-full md:w-1/3">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <Map className="mr-2" /> Google Maps
            </h3>
            <div id="map" className="w-full h-80 rounded-md mb-2"></div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors mt-2"
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=FPT+University+Ho+Chi+Minh+City`, '_blank')}
            >
              Xem bản đồ lớn
            </button>
          </div>
        </div>

        {/* Copyright và Social Icons */}
        <div className="mt-8 pt-8 border-t border-blue-400">
          <div className="flex justify-center items-center">
            <p>© 2024 Phòng khám Thú Y GenKiKoi. Tất cả các quyền được bảo lưu.</p>
            <div className="flex space-x-4">
              {/* Add your social icons here */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
