import { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import FishBanner2 from "../assets/banner_2.jpg";
import FishBanner from "../assets/long-background.jpg";
import { AnimatedSection, DividerComponent } from "../share";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="lg:pt-30 min-h-screen bg-gradient-to-t from-[#2A7F9E] to-[#175670] pt-32 text-white">
        <div className="container mx-auto lg:px-40">
          <AnimatedSection
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 2, delay: 0.5 },
              },
            }}
          >
            <div className="my-10 text-center">
              <h1 className="mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-5xl font-bold text-transparent">
                GenKiKoi
              </h1>
              <p className="text-xl text-blue-100">
                Chăm sóc cá Koi toàn diện, quản lý dịch vụ dễ dàng
              </p>
            </div>
          </AnimatedSection>

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
            <div className="flex justify-center">
              <img
                className="rounded-2xl opacity-90 shadow-2xl brightness-90 contrast-125 saturate-[0.85] transition-all duration-500 hover:scale-105 hover:opacity-100 hover:brightness-100 hover:contrast-100 hover:saturate-100"
                src={FishBanner2}
                alt="GenKiKoi Banner"
              />
            </div>
          </AnimatedSection>

          {/* About Section */}
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
            <div className="mt-20 space-y-8">
              <h1 className="mb-10 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-center text-4xl font-bold text-transparent">
                Chúng tôi ở đây để giúp bạn
              </h1>
              <div className="space-y-6">
                <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                  <p className="text-justify leading-relaxed">
                    Chăm sóc cá Koi ở thời điểm hiện tại được xem như là một niềm đam mê và nhu cầu
                    thiết yếu của nhiều người. Đó không chỉ dừng lại ở việc cho ăn, duy trì môi
                    trường nước mà còn là những sự quan tâm, nâng niu những người bạn Koi như là
                    những thành viên đặc biệt trong gia đình.
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                  <p className="text-justify leading-relaxed">
                    Xuất phát từ những điều này, Trung tâm Chăm sóc Cá Koi GenkiKoi được thành lập
                    với mong muốn mang lại những giá trị tốt đẹp nhất cho các chú cá Koi. Đồng thời
                    tạo sự an tâm và tin tưởng cho những người yêu thích và nuôi dưỡng Koi khi đến
                    với GenkiKoi.
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                  <p className="text-justify leading-relaxed">
                    Chúng tôi thực sự tin rằng xuất phát từ tình yêu thương động vật nói chung và cá
                    Koi nói riêng, sẽ là con đường nhanh nhất và đúng đắn nhất để đi đến được trái
                    tim của khách hàng. Tại GenkiKoi, mỗi chú cá Koi đều nhận được sự chăm sóc tận
                    tâm và chuyên nghiệp, như thể chúng là một phần không thể thiếu trong gia đình
                    của chính chúng tôi.
                  </p>
                </div>

                {/* Mission Section */}
                <div className="mt-16">
                  <h2 className="mb-8 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-center text-3xl font-bold text-transparent">
                    Sứ mệnh của GenkiKoi
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {[
                      {
                        icon: "🏥",
                        mission:
                          "Cung cấp dịch vụ chăm sóc y tế toàn diện và chuyên nghiệp cho cá Koi.",
                      },
                      {
                        icon: "🔬",
                        mission:
                          "Áp dụng công nghệ và phương pháp điều trị tiên tiến nhất trong lĩnh vực thú y thủy sinh.",
                      },
                      {
                        icon: "📚",
                        mission:
                          "Nâng cao nhận thức về tầm quan trọng của việc chăm sóc sức khỏe cá Koi.",
                      },
                      {
                        icon: "💡",
                        mission:
                          "Hỗ trợ và tư vấn cho người nuôi Koi để tạo ra môi trường sống tốt nhất cho cá.",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:transform hover:bg-white/20 hover:shadow-xl"
                      >
                        <div className="flex items-start gap-4">
                          <span className="text-2xl">{item.icon}</span>
                          <p className="leading-relaxed text-gray-100">{item.mission}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Values Section */}
      <div className="relative min-h-screen bg-[#2A7F9E] py-16 text-white">
        <div className="container mx-auto px-4 lg:px-40">
          <div className="my-10 flex flex-col lg:flex-row">
            <div className="lg:w-1/2">
              <AnimatedSection
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 1.5, delay: 0.5 },
                  },
                }}
              >
                {[
                  {
                    title: "Uy tín",
                    description:
                      "Đội ngũ bác sĩ rất uy tín, có nhiều năm kinh nghiệm làm việc tại các bệnh viện thú y lớn tại Sài Gòn. Được rất nhiều khách hàng tin tưởng và đánh giá cao.",
                  },
                  {
                    title: "Chất lượng",
                    description:
                      "GenKiKoi là phòng khám thú y chuyên về chăm sóc và điều trị cá Koi. Ở đây chúng tôi luôn đặt chất lượng điều trị lên hàng đầu.",
                  },
                  {
                    title: "Tận tâm",
                    description:
                      "Chúng tôi hiểu rằng bên cạnh chất lượng điều trị thì chính sự nỗ lực từ trong tâm sẽ là liều thuốc tinh thần mạnh mẽ nhất dành cho những bạn nhỏ khi đến với GenKiKoi.",
                  },
                ].map((value, index) => (
                  <div
                    key={index}
                    className="my-6 rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                  >
                    <h3 className="mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-2xl font-bold text-transparent">
                      {value.title}
                    </h3>
                    <p className="text-justify leading-relaxed text-gray-100">
                      {value.description}
                    </p>
                  </div>
                ))}
              </AnimatedSection>
            </div>

            <div className="lg:w-1/2">
              <AnimatedSection
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 1.5, delay: 0.5 },
                  },
                }}
                className="flex items-center justify-center"
              >
                <img
                  className="w-4/5 rounded-2xl opacity-90 shadow-2xl brightness-90 contrast-125 saturate-[0.85] transition-all duration-500 hover:scale-105 hover:opacity-100 hover:brightness-100 hover:contrast-100 hover:saturate-100"
                  src={FishBanner}
                  alt="GenKiKoi Values"
                />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
