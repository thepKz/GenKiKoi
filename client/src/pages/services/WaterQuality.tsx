import { AnimatedSection } from "../../share";

import { Button } from "antd";
import { ArrowRight2 } from "iconsax-react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WaterQuality2 from "../../assets/quality_1.png";
import WaterQuality1 from "../../assets/quality_2.png";

const WaterQuality = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      {/* Section 1 */}
      <div className="section bg-gradient-to-t from-[#2A7F9E] to-[#175670] py-36 pt-44 text-center text-white">
        <div className="container mx-auto lg:px-40">
          <div className="flex items-center justify-between gap-10">
            <div className="w-1/2">
              <AnimatedSection
                variants={{
                  hidden: { opacity: 0, x: -100 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 1.5, delay: 0.5 },
                  },
                }}
              >
                <img
                  src={WaterQuality1}
                  className="rounded-2xl shadow-2xl hover:scale-105 transition-all duration-500 
                    opacity-90 contrast-125 brightness-90 saturate-[0.85]
                    hover:opacity-100 hover:contrast-100 hover:brightness-100 hover:saturate-100"
                  alt=""
                />
              </AnimatedSection>
            </div>
            <div className="w-1/2 text-left">
              <AnimatedSection
                variants={{
                  hidden: { opacity: 0, x: 100 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 1.5, delay: 0.5 },
                  },
                }}
              >
                <h1 className="text-4xl lg:text-5xl font-bold text-center leading-tight mb-8 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Kiểm tra chất lượng ao hồ
                </h1>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                    <span className="text-2xl">💧</span>
                    <div className="text-lg leading-relaxed">
                      <p className="mb-3">
                        Việc kiểm tra và duy trì chất lượng nước ao hồ là rất quan trọng đối với sức khỏe và sự phát triển của cá Koi.
                        Cá Koi rất nhạy cảm với các thông số nước như pH, amoniac, nitrit, oxy hòa tan và nhiệt độ.
                      </p>
                      <p className="mb-3">Chúng tôi kiểm tra các chỉ số quan trọng:</p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Độ pH và độ kiềm của nước</li>
                        <li>Hàm lượng oxy hòa tan (DO)</li>
                        <li>Mức độ amoniac và nitrit</li>
                        <li>Nhiệt độ và các thông số khác</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  size="large"
                  onClick={() => navigate("/booking")}
                  className="mt-8 px-8 py-6 bg-white/10 hover:bg-white/20 text-white border-none rounded-full text-lg font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105"
                >
                  Đặt Lịch Ngay
                  <ArrowRight2 className="animate-bounce" size={20} />
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-gradient-to-b from-[#2A7F9E] to-[#1A5F7E]">
      <svg
          viewBox="0 0 1000 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            opacity="0.15"
            fill="url(#gradient1)"
            d="M0 14C0 14 88.64 17.48 300 50C560 90 814 77 1003 40L1015 68L1018 104H0V14Z"
          ></path>
          <path
            opacity="0.3"
            fill="url(#gradient2)"
            d="M0 45C0 45 271 90.13 500 77C657 68 830 30 1015 14V100H0V45Z"
          ></path>
          <path
            fill="url(#gradient3)"
            d="M0 58C0 58 188.29 90 508 90C798 90 1002 55 1002 55V100H0V58Z"
          ></path>
          <defs>
            <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2A7F9E" />
              <stop offset="100%" stopColor="#236F8E" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#236F8E" />
              <stop offset="100%" stopColor="#1C5F7E" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1C5F7E" />
              <stop offset="100%" stopColor="#1A5F7E" />
            </linearGradient>
          </defs>
        </svg>
        <div className="section bg-gradient-to-b from-[#1A5F7E] hover:bg-white/15 to-[#154F6E] text-center text-white">
          <div className="container mx-auto lg:px-40">
            <div className="flex items-center justify-between gap-10">
              <div className="w-1/2 text-left">
                <div className="my-5 space-y-6">
                  <AnimatedSection
                    variants={{
                      hidden: { opacity: 0, x: -100 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 1.5, delay: 0.5 },
                      },
                    }}
                  >
                    <div className="flex items-start gap-4 p-4 bg-white/10 rounded-t-xl backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                      <span className="text-2xl">🔬</span>
                      <p className="text-lg leading-relaxed">
                        Cá Koi rất nhạy cảm với chất lượng nước, nước không đạt tiêu chuẩn có thể gây ra nhiều vấn đề sức khỏe...
                      </p>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 rounded-b-xl">
                      <span className="text-2xl">👨‍🔬</span>
                      <div className="text-lg leading-relaxed">
                        <p className="mb-3">
                          Dịch vụ kiểm tra chất lượng nước của chúng tôi sẽ giúp bạn đảm bảo môi trường sống tốt nhất cho cá Koi của bạn.
                        </p>
                        <p>
                          Đừng để chất lượng nước ảnh hưởng đến sức khỏe và vẻ đẹp của cá Koi của bạn.
                          Hãy liên hệ với GenkiKoi ngay hôm nay để được tư vấn và kiểm tra chất lượng nước!
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              </div>
              <div className="w-1/2">
                <AnimatedSection
                  variants={{
                    hidden: { opacity: 0, x: 100 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 1.5, delay: 0.5 },
                    },
                  }}
                >
                  <img
                    className="rounded-2xl shadow-2xl hover:scale-105 transition-all duration-500 
                    opacity-90 contrast-125 brightness-90 saturate-[0.85]
                    hover:opacity-100 hover:contrast-100 hover:brightness-100 hover:saturate-100"
                    src={WaterQuality2}
                    alt=""
                  />
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterQuality;
