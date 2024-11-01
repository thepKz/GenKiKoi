import { Button } from "antd";
import { ArrowRight2 } from "iconsax-react";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Fish4 from "../../assets/fish-care-4.jpg";
import { AnimatedSection, DividerComponent } from "../../share";
const Services = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

 
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="min-h-screen pt-32 lg:pt-30 bg-gradient-to-t from-[#2A7F9E] to-[#175670] text-white">
        <div className="mx-auto px-4 lg:px-40">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <AnimatedSection
                variants={{
                  hidden: { opacity: 0, x: -100 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { duration: 1.5, delay: 0.5 }
                  }
                }}
              >
                <img
                  src={Fish4}
                  className="rounded-2xl shadow-2xl hover:scale-105 transition-all duration-500"
                  alt="Phòng khám thú y GenKiKoi - Chăm sóc thú cưng chuyên nghiệp"
                />
              </AnimatedSection>
            </div>

            <div className="lg:w-1/2 text-left order-1 lg:order-2">
              <AnimatedSection
                variants={{
                  hidden: { opacity: 0, x: 100 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 1.5, delay: 0.5 }
                  }
                }}
              >
                <h1 className="text-4xl lg:text-5xl font-bold text-center leading-tight mb-8 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Chăm Sóc Thú Cưng Tại GenKiKoi
                </h1>

                <div className="space-y-6">
                  {[
                    {
                      icon: "🤔",
                      text: <><span className="font-semibold text-blue-100">Tìm nơi uy tín</span> cho thú cưng của bạn?</>
                    },
                    {
                      icon: "👨‍⚕️", 
                      text: <><span className="font-semibold text-blue-100">Đội ngũ bác sĩ chuyên nghiệp</span> phục vụ 24/7.</>
                    },
                    {
                      icon: "✨",
                      text: <>Tại <span className="font-semibold text-blue-100">GenKiKoi</span>, chúng tôi là ngôi nhà thứ hai của thú cưng với trang thiết bị hiện đại.</>
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                      <span className="text-2xl">{item.icon}</span>
                      <p className="text-lg leading-relaxed">{item.text}</p>
                    </div>
                  ))}
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

      
      {/* Services */}
      <div className="relative min-h-screen bg-[#2A7F9E] text-white py-16">
      <div className="container mx-auto px-4 lg:px-40">
        <AnimatedSection
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.5, delay: 0.5 }
            }
          }}
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-6">Đầy đủ dịch vụ cho thú cưng của bạn</h1>
            <div className="flex justify-center items-center gap-2">
              <div className="relative">
                
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "🏥",
                title: "Tư vấn & Điều trị",
                description: "Với kinh nghiệm của bác sĩ trình độ chuyên môn cao, nhiều năm kinh nghiệm làm việc tại Sài Gòn."
              },
              {
                icon: "🔬",
                title: "Xét nghiệm",
                description: "Bao gồm xét nghiệm máu và xét nghiệm ký sinh trùng máu."
              },
              {
                icon: "📱",
                title: "Siêu âm",
                description: "Gồm có siêu âm thai và siêu âm giúp phát hiện các bệnh ở mô mềm."
              },
              {
                icon: "⚕️",
                title: "Phẫu thuật",
                description: "Đem lại những điều an toàn nhất cho thú cưng của bạn."
              },
              {
                icon: "💉",
                title: "Tiêm ngừa",
                description: "Tiêm chủng vắc xin là biện pháp phòng bệnh truyền nhiễm đơn giản và hiệu quả nhất hiện nay."
              },
              {
                icon: "🏪",
                title: "Pet Shop",
                description: "Chúng tôi cung cấp những mặt hàng thiết yếu nhất cho thú cưng của bạn."
              }
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:bg-white/20 hover:transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{service.icon}</div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                    <p className="text-gray-100 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
      <DividerComponent />
    </div>
  );
};

export default Services;