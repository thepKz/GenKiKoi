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
      
      L.marker([lat, lon], { icon: genkikoiIcon }).addTo(map)
        .bindPopup('GenKiKoi')
        .openPopup();
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
    <footer className="section bg-blue-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          {/* Cột 1: Thông tin phòng khám */}
          <div className="w-full md:w-1/5 mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <img src={Logo} alt="GenKiKoi Logo" className="w-12 h-12 mr-2" />
              <div>
                <h2 className="text-xl font-bold">Phòng khám Thú Y</h2>
                <h1 className="text-2xl font-bold">GenKiKoi</h1>
              </div>
            </div>
            <p className="text-sm">Uy tín - Chất lượng - Tận tâm</p>
          </div>

          {/* Cột 2: Về Phòng Khám và Dịch Vụ */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <div className="flex">
              <div className="w-1/2">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <Happyemoji className="mr-2" /> Về Phòng Khám
                </h3>
                <ul className="space-y-2">
                  {["Giới thiệu", "Chọn GenKiKoi", "Hình ảnh hoạt động", "Liên hệ"].map((item) => (
                    <li key={item}><Link to="#" className="hover:text-blue-300 transition-colors">{item}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="w-1/2">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <Pet className="mr-2" /> Dịch Vụ
                </h3>
                <ul className="space-y-2">
                  {["Tư vấn & Điều trị", "Xét nghiệm", "Ký sinh trùng máu", "Kháng sinh đồ", "Siêu âm", "Phẫu thuật", "Tiêm ngừa", "Pet Shop"].map((item) => (
                    <li key={item}><Link to="#" className="hover:text-blue-300 transition-colors">{item}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Cột 3: Google Maps */}
          <div className="w-full md:w-1/3">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <Map className="mr-2" /> Google Maps
            </h3>
            <div id="map" className="w-full h-80 rounded-md mb-2"></div>
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors mt-2"
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