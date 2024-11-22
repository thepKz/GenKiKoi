import { Button } from "antd";
import { ArrowRight2 } from "iconsax-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServiceBanner from "../../assets/serviceBanner.png";
import { AnimatedSection } from "../../share";
const Services = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="lg:pt-30 min-h-screen bg-gradient-to-t from-[#2A7F9E] to-[#175670] pt-32 text-white">
        <div className="mx-auto px-4 lg:px-40">
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">
            <div className="order-2 lg:order-1 lg:w-1/2">
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
                  src={ServiceBanner}
                  className="rounded-2xl opacity-90 shadow-2xl brightness-90 contrast-125 saturate-[0.85] transition-all duration-500 hover:scale-105 hover:opacity-100 hover:brightness-100 hover:contrast-100 hover:saturate-100"
                  alt="Phòng khám thú y GenKiKoi - Chăm sóc thú cưng chuyên nghiệp"
                />
              </AnimatedSection>
            </div>

            <div className="order-1 text-left lg:order-2 lg:w-1/2">
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
                <h1 className="mb-8 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-center text-4xl font-bold leading-tight text-transparent lg:text-5xl">
                  Chăm Sóc Thú Cưng Tại GenKiKoi
                </h1>

                <div className="space-y-6">
                  {[
                    {
                      icon: "🤔",
                      text: (
                        <>
                          <span className="font-semibold text-blue-100">Tìm nơi uy tín</span> cho
                          thú cưng của bạn?
                        </>
                      ),
                    },
                    {
                      icon: "👨‍⚕️",
                      text: (
                        <>
                          <span className="font-semibold text-blue-100">
                            Đội ngũ bác sĩ chuyên nghiệp
                          </span>{" "}
                          phục vụ 24/7.
                        </>
                      ),
                    },
                    {
                      icon: "✨",
                      text: (
                        <>
                          Tại <span className="font-semibold text-blue-100">GenKiKoi</span>, chúng
                          tôi là ngôi nhà thứ hai của thú cưng với trang thiết bị hiện đại.
                        </>
                      ),
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <p className="text-lg leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>

                <Button
                  size="large"
                  onClick={() => navigate("/booking")}
                  className="mt-8 flex items-center gap-2 rounded-full border-none bg-white/10 px-8 py-6 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white/20"
                >
                  Đặt Lịch Ngay
                  <ArrowRight2
                    className="animate-bounce"
                    size={20}
                  />
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="relative min-h-screen bg-[#2A7F9E] py-16 text-white">
        <div className="container mx-auto px-4 lg:px-40">
          <AnimatedSection
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.5, delay: 0.5 },
              },
            }}
          >
            <div className="mb-16 text-center">
              <h1 className="mb-6 text-4xl font-bold">Đầy đủ dịch vụ cho thú cưng của bạn</h1>
              <div className="flex items-center justify-center gap-2">
                <div className="relative"></div>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  icon: "🏥",
                  title: "Tư vấn & Điều trị",
                  description:
                    "Với kinh nghiệm của bác sĩ trình độ chuyên môn cao, nhiều năm kinh nghiệm làm việc tại Sài Gòn.",
                },
                {
                  icon: "🔬",
                  title: "Xét nghiệm",
                  description: "Bao gồm xét nghiệm máu và xét nghiệm ký sinh trùng máu.",
                },
                {
                  icon: "📱",
                  title: "Siêu âm",
                  description: "Gồm có siêu âm thai và siêu âm giúp phát hiện các bệnh ở mô mềm.",
                },
                {
                  icon: "⚕️",
                  title: "Phẫu thuật",
                  description: "Đem lại những điều an toàn nhất cho thú cưng của bạn.",
                },
                {
                  icon: "💉",
                  title: "Tiêm ngừa",
                  description:
                    "Tiêm chủng vắc xin là biện pháp phòng bệnh truyền nhiễm đơn giản và hiệu quả nhất hiện nay.",
                },
                {
                  icon: "🏪",
                  title: "Pet Shop",
                  description:
                    "Chúng tôi cung cấp những mặt hàng thiết yếu nhất cho thú cưng của bạn.",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:transform hover:bg-white/20 hover:shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{service.icon}</div>
                    <div className="flex-1">
                      <h2 className="mb-2 text-2xl font-bold">{service.title}</h2>
                      <p className="leading-relaxed text-gray-100">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Services;
