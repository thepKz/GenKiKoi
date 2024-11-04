import { AnimatedSection } from "../../share";

import { Button } from "antd";
import { ArrowRight2 } from "iconsax-react";
import { useNavigate } from 'react-router-dom';

import Banner1 from "../../assets/ct_banner1.png";
import Banner2 from "../../assets/ct_banner2.png";

const ConsultingTreatment = () => {
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
                  hidden: {
                    opacity: 0,
                    x: -100,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 1.5, delay: 0.5 },
                  },
                }}
              >
                <img
                  src={Banner1}
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
                  hidden: {
                    opacity: 0,
                    x: 100,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 1.5, delay: 0.5 },
                  },
                }}
              >
                <h1 className="text-4xl lg:text-5xl font-bold text-center leading-tight mb-8 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Tư vấn và Điều trị
                </h1>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                    <span className="text-2xl">🏥</span>
                    <div className="text-lg leading-relaxed">
                      <p className="mb-3">
                        Dịch vụ tư vấn và điều trị cho cá Koi là việc cung cấp các dịch vụ liên quan đến
                        sức khỏe và chăm sóc cho cá Koi như khám bệnh, điều trị, các cách thức phòng
                        ngừa, tư vấn dinh dưỡng, chăm sóc cá nhân và nhiều những việc khác.
                      </p>
                      <p className="mb-3">Chúng tôi cung cấp hai hình thức tư vấn chính:</p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Tư vấn trực tuyến (Online): Hỗ trợ nhanh chóng và tiện lợi thông qua video call hoặc chat.</li>
                        <li>Tư vấn trực tiếp (Offline): Kiểm tra và tư vấn chi tiết tại phòng khám của chúng tôi.</li>
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
                      hidden: {
                        opacity: 0,
                        x: -100,
                      },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 1.5, delay: 0.5 },
                      },
                    }}
                  >
                    <div className="flex items-start gap-4 p-4 bg-white/10 rounded-t-xl backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                      <span className="text-2xl">🏥</span>
                      <p className="text-lg leading-relaxed">
                        Dịch vụ tư vấn và điều trị cho cá Koi là một phần không thể thiếu trong việc
                        chăm sóc và bảo vệ sức khỏe của cá Koi...
                      </p>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 rounded-b-xl">
                      <span className="text-2xl">👨‍⚕️</span>
                      <div className="text-lg leading-relaxed">
                        <p className="mb-3">
                          Phòng khám Thú y GenKiKoi với đội ngũ bác sĩ chuyên khoa, trình độ cao và giàu
                          kinh nghiệm, luôn sẵn sàng tiếp nhận cá Koi của bạn. Chúng tôi luôn mong có
                          thể đáp ứng được nhu cầu chăm sóc sức khoẻ cho cá Koi một cách đa dạng nhất.
                        </p>
                        <p>
                          Với những điều đó, GenKiKoi tin rằng chúng tôi sẽ là một trong những điểm đến
                          uy tín của khách hàng trong việc chăm sóc và bảo vệ sức khoẻ cho cá Koi.
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              </div>
              <div className="w-1/2">
                <AnimatedSection
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: 100,
                    },
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
                    src={Banner2}
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

export default ConsultingTreatment;
