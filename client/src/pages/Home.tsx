import { Avatar, Button, message, Rate, Spin } from "antd";
import { ArrowLeft2, ArrowRight2, Calendar, Call, EmojiHappy, Moneys, Profile2User, Star, User } from "iconsax-react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Background from "../assets/background.webp";

import Image2 from "../assets/Image1.jpg";
import Image1 from "../assets/Image2.jpg";
import Image3 from "../assets/Image3.jpg";


import Fish1 from "../assets/fish-care-1.jpg";
import Fish2 from "../assets/fish-care-2.webp";
import Fish3 from "../assets/fish-care-3.jpg";
import Fish4 from "../assets/fish-care-4.jpg";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleAPI } from "../apis/handleAPI";
import FishBanner from "../assets/fish-banner.png";
import { AnimatedSection, DividerComponent } from "../share";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const Home = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [isLoadingFeedbacks, setIsLoadingFeedbacks] = useState(false);

  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        setIsLoadingFeedbacks(true);
        const api = `/api/feedbacks/public`;
        const res = await handleAPI(api, undefined, "GET");
        setFeedbacks(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message || "Có lỗi xảy ra khi tải phản hồi");
      } finally {
        setIsLoadingFeedbacks(false); 
      }
    };
    getFeedbacks();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="relative">
      {/* Background layer */}
      <div className="fixed inset-0 z-0">
        <img
          className="h-full w-full object-cover"
          src={Background}
          alt=""
        />
        {/* Overlay layer */}
        <div className="absolute inset-0 bg-[#0C3C54] opacity-80"></div>
      </div>

      {/* Banner Container */}
      <div className="relative min-h-screen">
        {/* Banner Content */}
        <div className="relative z-0 flex min-h-screen flex-col items-center justify-between px-4 py-20 text-white lg:flex-row lg:px-40">
          <AnimatedSection
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
            }}
            className="w-full rounded-lg bg-opacity-50 p-6 lg:w-3/6"
          >
            <h1 className="heading-1 mb-4 text-center text-3xl font-bold lg:text-left lg:text-4xl">Hơn cả sự hài lòng.</h1>
            <p className="py-4 text-center text-sm lg:text-left lg:text-base">
              GenKiKoi là tập thể những người trẻ, đầy nhiệt huyết và giàu kinh nghiệm trong lĩnh
              vực điều trị và chăm sóc cho cá Koi. <br />
              Tôn chỉ của chúng tôi là Uy tín – Chất lượng – Tận tâm.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                ghost
                size="large"
                type="primary"
                onClick={() => window.open('https://zalo.me/0888500703', '_blank')}
                className="z-20 mt-4 flex items-center justify-center border-2 border-white transition-all duration-300 hover:bg-white hover:text-blue-700"
              >
                Gọi tổng đài
                <Call size={18} className="ml-2" />
              </Button>

              <Button
                ghost
                size="large" 
                type="primary"
                onClick={() => navigate('/booking')}
                className="z-20 mt-4 flex items-center justify-center border-2 border-white transition-all duration-300 hover:bg-white hover:text-blue-700"
              >
                Đặt lịch hẹn
                <Calendar size={18} className="ml-2" />
              </Button>

              <Button
                ghost
                size="large"
                type="primary"
                onClick={() => navigate('/doctors')}
                className="z-20 mt-4 flex items-center justify-center border-2 border-white transition-all duration-300 hover:bg-white hover:text-blue-700"
              >
                Tìm bác sĩ
                <Profile2User size={18} className="ml-2" />
              </Button>
            </div>
          </AnimatedSection>

          <div className="mt-8 flex w-full items-center justify-center gap-4 lg:mt-0 lg:w-1/2">
            <AnimatedSection
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
              }}
              className="h-60 w-1/3 transform overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:scale-105 lg:h-80"
            >
              <img
                src={Image1}
                alt=""
                className="h-full w-full object-cover filter transition-all duration-500 hover:brightness-110"
              />
            </AnimatedSection>
            <AnimatedSection
              variants={{
                hidden: { opacity: 0, y: -50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
              }}
              className="h-72 w-1/3 transform overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:scale-105 lg:h-96"
            >
              <img
                src={Image2}
                alt=""
                className="h-full w-full object-cover filter transition-all duration-500 hover:saturate-150"
              />
            </AnimatedSection>
            <AnimatedSection
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
              }}
              className="h-60 w-1/3 transform overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:scale-105 lg:h-80"
            >
              <img
                src={Image3}
                alt=""
                className="h-full w-full object-cover filter transition-all duration-500 hover:contrast-125"
              />
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Why Section */}
      <div className="section relative min-h-screen bg-gradient-to-t from-[#2A7F9E] to-[#175670] py-20 text-center text-white">
        <div className="container mx-auto px-4 lg:px-40">
          <AnimatedSection
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0, transition: { duration: 2, delay: 0.5 } },
            }}
          >
            <h1 className="heading-1 mb-5 text-3xl lg:text-4xl">Tại sao chọn GenKiKoi?</h1>
            <p className="text-base lg:text-lg">
              Rất cảm ơn bạn đã sử dụng dịch vụ tại GenKiKoi. Nếu chưa, chúng tôi có những lý do sau
              để hy vọng một lúc nào đó sẽ được phục vụ bạn.
            </p>
          </AnimatedSection>

          <AnimatedSection
            variants={{
              hidden: { opacity: 0, x: 100 },
              visible: { opacity: 1, x: 0, transition: { duration: 2, delay: 0.5 } },
            }}
            className="my-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            <div className="transform rounded-xl bg-gradient-to-br from-[#ffffff20] to-[#ffffff10] p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center gap-6">
                <div className="rounded-full bg-[#f7776d] p-4 shadow-lg">
                  <EmojiHappy
                    size={40}
                    variant="Bold"
                  />
                </div>
                <div className="text-left">
                  <h2 className="mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-2xl font-bold text-transparent">
                    Cam kết sự hài lòng
                  </h2>
                  <p className="text-gray-200">300+ người dùng tin tưởng</p>
                </div>
              </div>
            </div>

            <div className="transform rounded-xl bg-gradient-to-br from-[#ffffff20] to-[#ffffff10] p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center gap-6">
                <div className="rounded-full bg-[#406ff4] p-4 shadow-lg">
                  <Moneys
                    size={40}
                    variant="Bold"
                  />
                </div>
                <div className="text-left">
                  <h2 className="mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-2xl font-bold text-transparent">
                    Thanh toán tiện lợi
                  </h2>
                  <p className="text-gray-200">
                    Có nhiều hình thức thanh toán cho bạn tại GenKiKoi
                  </p>
                </div>
              </div>
            </div>

            <div className="transform rounded-xl bg-gradient-to-br from-[#ffffff20] to-[#ffffff10] p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center gap-6">
                <div className="rounded-full bg-[#2ed67b] p-4 shadow-lg">
                  
                </div>
                <div className="text-left">
                  <h2 className="mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-2xl font-bold text-transparent">
                    Sạch sẽ & thân thiện
                  </h2>
                  <p className="text-gray-200">
                    Trang thiết bị hiện đại, không gian sạch sẽ và an toàn
                  </p>
                </div>
              </div>
            </div>

            <div className="transform rounded-xl bg-gradient-to-br from-[#ffffff20] to-[#ffffff10] p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center gap-6">
                <div className="rounded-full bg-[#5756d6] p-4 shadow-lg">
                  <Star
                    size={40}
                    variant="Bold"
                  />
                </div>
                <div className="text-left">
                  <h2 className="mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-2xl font-bold text-transparent">
                    Khuyến mãi
                  </h2>
                  <p className="text-gray-200">Nhiều chế độ khuyến mãi cho khách hàng</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection
            variants={{
              hidden: {
                opacity: 0,
                scale: 0.5,
              },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 1, delay: 0.5 },
              },
            }}
          >
            <Button
              style={{ fontSize: 18 }}
              size="large"
              type="link"
              onClick={() => navigate("/about-us")}
              className="mt-8 text-white transition-all duration-300 hover:scale-110 hover:text-blue-300"
            >
              Và thêm nhiều lý do để chọn GenKiKoi
              <ArrowRight2
                size={18}
                className="ml-2"
              />
            </Button>
          </AnimatedSection>
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
              <h1 className="mb-6 text-3xl font-bold lg:text-4xl">Đầy đủ dịch vụ cho thú cưng của bạn</h1>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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

      {/* Images */}
      <div className="section bg-[#0C3C54] pb-0 text-center text-white">
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
            <h1 className="heading-1 mb-5">Hình ảnh hoạt động tại GenKiKoi</h1>
          </AnimatedSection>
          {/* Images list */}
          <AnimatedSection
            variants={{
              hidden: {
                opacity: 0,
                x: 100,
              },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 2, delay: 0.5 },
              },
            }}
          >
            <div className="my-20 grid grid-cols-4 gap-5">
              <div className="h-64 overflow-hidden rounded-xl duration-300 ease-in-out hover:-translate-y-3 hover:shadow-lg">
                <img
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                  src={Fish1}
                  alt=""
                />
              </div>

              <div className="h-64 overflow-hidden rounded-xl duration-300 ease-in-out hover:-translate-y-3 hover:shadow-lg">
                <img
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                  src={Fish2}
                  alt=""
                />
              </div>

              <div className="h-64 overflow-hidden rounded-xl duration-300 ease-in-out hover:-translate-y-3 hover:shadow-lg">
                <img
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                  src={Fish3}
                  alt=""
                />
              </div>

              <div className="h-64 overflow-hidden rounded-xl duration-300 ease-in-out hover:-translate-y-3 hover:shadow-lg">
                <img
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                  src={Fish4}
                  alt=""
                />
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection
            variants={{
              hidden: {
                opacity: 0,
                scale: 0.5,
              },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 1, delay: 0.5 },
              },
            }}
          >
            <Button
              style={{ fontSize: 18 }}
              size="large"
              type="link"
              onClick={() => navigate("/images")}
            >
              Thêm hình ảnh
              <ArrowRight2 size={18} />
            </Button>
          </AnimatedSection>
        </div>
        <div className="bg-[#0C3C54]">
          <svg
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          ></svg>
        </div>
      </div>

      {/* Feedbacks */}
      <div className="section relative min-h-screen bg-[#2A7F9E] text-center text-white">
        <div className="container mx-auto lg:px-40">
          <AnimatedSection
            variants={{
              hidden: {
                opacity: 0,
                y: 150,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.5, delay: 0.5 },
              },
            }}
          >
            <h1 className="mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-4xl font-bold text-transparent lg:text-5xl">
              Được khách hàng ghi nhận
            </h1>
            <div className="flex justify-center gap-2">
              <p className="text-xl">Sự hài lòng của khách hàng là thứ chúng tôi luôn mong muốn</p>

            </div>
            <div className="my-10 cursor-grabbing">
              <Carousel
                infinite={true}
                autoPlay
                autoPlaySpeed={3000}
                customRightArrow={
                  <button className="absolute right-0 p-2 text-white duration-200 ease-in hover:text-blue-300">
                    <ArrowRight2 />
                  </button>
                }
                customLeftArrow={
                  <button className="absolute left-2 p-2 text-white duration-200 ease-in hover:text-blue-300">
                    <ArrowLeft2 />
                  </button>
                }
                className="p-1"
                responsive={responsive}
              >
                {isLoadingFeedbacks ? (
                  <div className="flex justify-center">
                    <Spin size="large" />
                  </div>
                ) : feedbacks.length > 0 ? (
                  feedbacks.map((feedback, index) => (
                    <div key={index} className="mx-2 flex h-full flex-col justify-between rounded-xl bg-white/10 p-5 py-10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                      <div>
                        <div className="mb-3">
                          <Rate disabled defaultValue={feedback.rating} />
                        </div>
                        <p className="mb-3 text-lg">{feedback.comment}</p>
                        <p className="text-sm text-gray-300">Dịch vụ: {feedback.serviceName}</p>
                      </div>
                      <div className="text-center mt-4">
                        <Avatar
                          size="large"
                          className="mb-2 border-2 border-blue-300"
                          src={feedback.customerAvatar}
                          icon={<User />}
                        />
                        <h3 className="font-bold text-blue-100">{feedback.customerName}</h3>
                        <p className="text-sm text-gray-300">
                          {new Date(feedback.feedbackDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p>Chưa có đánh giá nào</p>
                  </div>
                )}
              </Carousel>
            </div>
          </AnimatedSection>
        </div>
      </div>
      <DividerComponent />

      {/* Expected */}
      <div className="section relative -mt-1 min-h-screen bg-blue-primary text-center text-white">
        <div className="container mx-auto lg:px-40">
          <AnimatedSection
            variants={{
              hidden: {
                opacity: 0,
                y: 50,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.5, delay: 0.5 },
              },
            }}
          >
            <h1 className="mb-6 text-4xl font-bold text-transparent text-white lg:text-5xl">
              Kỳ vọng gì từ GenKiKoi
            </h1>
            <div className="flex justify-center gap-2">
              <p className="text-xl">
                Hãy để chúng tôi thay mặt bạn mang đến cho thú cưng những điều tốt đẹp nhất.
              </p>
            </div>
          </AnimatedSection>
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
                  <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-3xl font-bold shadow-lg">
                    1
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-2xl font-bold text-transparent">
                      Uy tín
                    </h3>
                    <p className="leading-relaxed text-gray-100">
                      Đội ngũ bác sĩ rất uy tín, có nhiều năm kinh nghiệm làm việc tại các bệnh viện
                      thú y lớn tại Sài Gòn. Được rất nhiều khách hàng tin tưởng và đánh giá cao.
                    </p>
                  </div>
                </div>

                <div className="my-6 flex gap-5">
                  <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-3xl font-bold shadow-lg">
                    2
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-2xl font-bold text-transparent">
                      Chất lượng
                    </h3>
                    <p className="leading-relaxed text-gray-100">
                      GenKiKoi là phòng khám thú y chuyên về chăm sóc và điều trị cá Koi. Ở đây
                      chúng tôi luôn đặt chất lượng điều trị lên hàng đầu.
                    </p>
                  </div>
                </div>

                <div className="my-6 flex gap-5">
                  <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-400 text-3xl font-bold shadow-lg">
                    3
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-2xl font-bold text-transparent">
                      Tận tâm
                    </h3>
                    <p className="leading-relaxed text-gray-100">
                      Chúng tôi hiu rằng bên cạnh chất lượng điều trị thì chính sự nỗ lực từ trong
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
                className="flex h-full items-center justify-center"
              >
                <img
                  className="ml-auto w-4/5 transition-all duration-300 hover:scale-105"
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

export default Home;
