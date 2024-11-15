import { Facebook, Happyemoji, Instagram, Map, Pet, Youtube } from "iconsax-react";
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

      L.marker([lat, lon], { icon: genkikoiIcon })
        .addTo(map)
        .bindPopup("GenKiKoi")
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
    <footer className="relative z-20 bg-gradient-to-b from-[#0e314e] to-[#175670]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start">
              <Link to="/" className="group">
                <img
                  src={Logo}
                  alt="GenKiKoi Logo"
                  className="h-16 w-16 rounded-full transition-transform group-hover:scale-110"
                />
              </Link>
              <h2 className="mt-4 text-xl font-bold text-white">Phòng khám Thú Y</h2>
              <h1 className="text-2xl font-bold text-white">GenKiKoi</h1>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-8">
              {/* About Links */}
              <div>
                <h3 className="mb-4 flex items-center justify-center text-lg font-semibold text-white md:justify-start">
                  <Happyemoji className="mr-2 h-5 w-5" />
                  Về Phòng Khám
                </h3>
                <ul className="space-y-2 text-center md:text-left">
                  <FooterLink to="/about-us">Giới thiệu</FooterLink>
                  <FooterLink to="/images">Hình ảnh</FooterLink>
                  <FooterLink to="/faq">Hỏi đáp</FooterLink>
                  <FooterLink to="/doctors">Bác sĩ</FooterLink>
                  <FooterLink to="/terms-of-service">Điều khoản</FooterLink>
                </ul>
              </div>

              {/* Services Links */}
              <div>
                <h3 className="mb-4 flex items-center justify-center text-lg font-semibold text-white md:justify-start">
                  <Pet className="mr-2 h-5 w-5" />
                  Dịch Vụ
                </h3>
                <ul className="space-y-2 text-center md:text-left">
                  <FooterLink to="/services/consulting-treatment">
                    Tư vấn & Điều trị
                  </FooterLink>
                  <FooterLink to="/services/vaccine">Tiêm ngừa</FooterLink>
                  <FooterLink to="/services/water-quality">
                    Kiểm tra nước
                  </FooterLink>
                  <FooterLink to="/services/service-price-table">
                    Bảng giá
                  </FooterLink>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="space-y-4">
            <h3 className="flex items-center justify-center text-lg font-semibold text-white md:justify-start">
              <Map className="mr-2 h-5 w-5" />
              Bản đồ
            </h3>
            <div className="overflow-hidden rounded-xl shadow-lg">
              <div id="map" className="h-[300px] w-full md:h-[400px]" />
            </div>
            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=FPT+University+Ho+Chi+Minh+City`,
                  "_blank"
                )
              }
              className="w-full rounded-lg bg-white/10 px-4 py-3 text-sm font-medium text-white 
                transition-all hover:bg-white/20 hover:shadow-lg focus:outline-none 
                focus:ring-2 focus:ring-white/20"
            >
              Xem bản đồ lớn
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-center text-sm text-gray-300">
              © 2024 Phòng khám Thú Y GenKiKoi. Tất cả các quyền được bảo lưu.
            </p>
            <div className="flex items-center space-x-6">
              <SocialLink 
                href="https://facebook.com" 
                icon="facebook" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </SocialLink>
              <SocialLink 
                href="https://instagram.com" 
                icon="instagram"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </SocialLink>
              <SocialLink 
                href="https://youtube.com" 
                icon="youtube"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube className="h-6 w-6" />
              </SocialLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link
      to={to}
      className="text-sm text-gray-300 transition-colors hover:text-white hover:underline"
    >
      {children}
    </Link>
  </li>
);

const SocialLink = ({ href, icon, children, className }: { 
  href: string; 
  icon: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a
    href={href}
    className={className}
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="sr-only">{icon}</span>
    {children}
  </a>
);

export default Footer;