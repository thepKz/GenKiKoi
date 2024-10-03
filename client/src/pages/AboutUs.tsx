import "react-multi-carousel/lib/styles.css";

import { useEffect } from "react";
import FishBanner2 from "../assets/banner_2.jpg";
import FishBanner from "../assets/fish-banner.png";
import { AnimatedSection, DividerComponent } from "../share";


const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {/* Banner */}

      {/* Why? Section */}
      <div className="section bg-blue-primary text-center text-white">
        <div className="container mx-auto lg:px-40">
          <AnimatedSection
            variants={{
              hidden: {
                opacity: 0,
                x: -100,
              },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 2, delay: 0.5 },
              },
            }}
          >
            <div className="bg-blue-primary p-6 text-center text-white">
              <div className="inline-flex items-baseline">
                <h1 className="mr-3 text-5xl font-bold">GenKiKoi</h1>
                <p className="text-sm italic">Nâng tầm sức khỏe, tô điểm hồ cá</p>
              </div>
            </div>

            <img
              src={FishBanner2}
              alt=""
            />
          </AnimatedSection>

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
            <div className="pt-32">
              <h1 className="heading-1">Chúng tôi ở đây để giúp bạn.</h1>
              <div className="text-justify">
                <p className="my-5">
                  Chăm sóc cá Koi ở thời điểm hiện tại được xem như là một niềm đam mê và nhu cầu
                  thiết yếu của nhiều người. Đó không chỉ dừng lại ở việc cho ăn, duy trì môi trường
                  nước mà còn là những sự quan tâm, nâng niu những người bạn Koi như là những thành
                  viên đặc biệt trong gia đình.
                </p>
                <p className="my-5">
                  Xuất phát từ những điều này, Trung tâm Chăm sóc Cá Koi GenkiKoi được thành lập với
                  mong muốn mang lại những giá trị tốt đẹp nhất cho các chú cá Koi. Đồng thời tạo sự
                  an tâm và tin tưởng cho những người yêu thích và nuôi dưỡng Koi khi đến với
                  GenkiKoi.
                </p>
                <p className="my-5">
                  Chúng tôi thực sự tin rằng xuất phát từ tình yêu thương động vật nói chung và cá
                  Koi nói riêng, sẽ là con đường nhanh nhất và đúng đắn nhất để đi đến được trái tim
                  của khách hàng. Tại GenkiKoi, mỗi chú cá Koi đều nhận được sự chăm sóc tận tâm và
                  chuyên nghiệp, như thể chúng là một phần không thể thiếu trong gia đình của chính
                  chúng tôi.
                </p>

                <div className="flex justify-center">
                  <div className="my-6 h-0.5 w-52 bg-white"></div>
                </div>

                <p my-5> Sứ mệnh của GenkiKoi</p>
                <p my-5>1. Cung cấp dịch vụ chăm sóc y tế toàn diện và chuyên nghiệp cho cá Koi.</p>
                <p my-5>
                  2. Áp dụng công nghệ và phương pháp điều trị tiên tiến nhất trong lĩnh vực thú y
                  thủy sinh.
                </p>
                <p my-5>
                  3. Nâng cao nhận thức về tầm quan trọng của việc chăm sóc sức khỏe cá Koi.
                </p>
                <p my-5>
                  4. Hỗ trợ và tư vấn cho người nuôi Koi để tạo ra môi trường sống tốt nhất cho cá.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      <DividerComponent />

      {/* Expected */}
      <div className="section bg-blue-primary text-center text-white">
        <div className="container mx-auto lg:px-40">

          <div className="my-10 flex">
            <div className="w-1/2">
              <AnimatedSection
                variants={{
                  hidden: {
                    opacity: 0,
                    x: -50,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 1.5, delay: 0.5 },
                  },
                }}
              >
                <div className="my-6 flex gap-5">
                  <div className="flex-1 text-left">
                    <h3 className="mb-2 text-2xl font-bold">Uy tín</h3>
                    <p className="text-justify">
                      Đội ngũ bác sĩ rất uy tín, có nhiều năm kinh nghiệm làm việc tại các bệnh viện
                      thú y lớn tại Sài Gòn. Được rất nhiều khách hàng tin tưởng và đánh giá cao.
                    </p>
                  </div>
                </div>

                <div className="my-6 flex gap-5">
                  <div className="flex-1 text-left">
                    <h3 className="mb-2 text-2xl font-bold">Chất lượng</h3>
                    <p className="text-justify">
                      GenKiKoi là phòng khám thú y chuyên về chăm sóc và điều trị cá Koi. Ở đây
                      chúng tôi luôn đặt chất lượng điều trị lên hàng đầu.
                    </p>
                  </div>
                </div>

                <div className="my-6 flex gap-5">
                  <div className="flex-1 text-left">
                    <h3 className="mb-2 text-2xl font-bold">Tận tâm</h3>
                    <p className="text-justify">
                      Chúng tôi hiểu rằng bên cạnh chất lượng điều trị thì chính sự nỗ lực từ trong
                      tâm sẽ là liều thuốc tinh thần mạnh mẽ nhất dành cho những bạn nhỏ khi đến với
                      GenKiKoi.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
            <div className="w-1/2">
              <AnimatedSection
                variants={{
                  hidden: {
                    opacity: 0,
                    x: 50,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 1.5, delay: 0.5 },
                  },
                }}
                className="flex items-center justify-center"
              >
                <img
                  className="w-4/5"
                  src={FishBanner}
                  alt=""
                />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
      <DividerComponent />
    </div>
  );
};

export default AboutUs;
