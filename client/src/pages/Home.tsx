import { Avatar, Button } from "antd";
import { ArrowLeft2, ArrowRight2, EmojiHappy, Heart, HeartTick, Moneys, Star } from "iconsax-react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Background from "../assets/background.png";

import Image1 from "../assets/Image1.png";
import Image2 from "../assets/Image2.png";
import Image3 from "../assets/Image3.png";

import Icon1 from "../assets/Icon-01.svg";
import Icon2 from "../assets/Icon-02.svg";
import Icon3 from "../assets/Icon-03.svg";
import Icon4 from "../assets/Icon-04.svg";
import Icon5 from "../assets/Icon-05.svg";
import Icon6 from "../assets/Icon-06.svg";

import Fish1 from "../assets/fish-care-1.jpg";
import Fish2 from "../assets/fish-care-2.webp";
import Fish3 from "../assets/fish-care-3.jpg";
import Fish4 from "../assets/fish-care-4.jpg";

import { useEffect } from "react";
import FishBanner from "../assets/fish-banner.png";
import { AnimatedSection, DividerComponent } from "../share";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {/* Banner */}
      <div className="relative">
        <div className="absolute inset-0 z-0 bg-blue-secondary"></div>
        <div className="z-10">
          <img
            className="w-full object-cover opacity-15"
            src={Background}
            alt=""
          />
        </div>
        <div className="absolute top-44 flex justify-between text-white lg:px-40">
          <AnimatedSection
            variants={{
              hidden: {
                opacity: 0,
                x: -100,
              },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 2 },
              },
            }}
            className="mt-20 w-2/5"
          >
            <h1 className="heading-1">Hơn cả sự hài lòng.</h1>
            <p className="py-8 text-justify text-base">
              GenKiKoi là tập thể những người trẻ, đầy nhiệt huyết và giàu kinh nghiệm trong lĩnh
              vực điều trị và chăm sóc cho cá Koi. <br />
              Tôn chỉ của chúng tôi là Uy tín – Chất lượng – Tận tâm.
            </p>
            <Button
              ghost
              size="large"
              type="primary"
            >
              Về GenKiKoi
              <ArrowRight2 size={18} />
            </Button>
          </AnimatedSection>
          <div className="flex w-3/5 items-center justify-center gap-[-25px]">
            <AnimatedSection
              variants={{
                hidden: {
                  opacity: 0,
                  y: 100,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 2 },
                },
              }}
              className="w-1/3"
            >
              <img
                src={Image1}
                alt=""
              />
            </AnimatedSection>
            <AnimatedSection
              variants={{
                hidden: {
                  opacity: 0,
                  y: -100,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 2 },
                },
              }}
              className="w-1/3"
            >
              <img
                src={Image2}
                alt=""
              />
            </AnimatedSection>
            <AnimatedSection
              variants={{
                hidden: {
                  opacity: 0,
                  y: 100,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 2 },
                },
              }}
              className="w-1/3"
            >
              <img
                src={Image3}
                alt=""
              />
            </AnimatedSection>
          </div>
        </div>
      </div>
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
            <h1 className="heading-1 mb-5">Tại sao chọn GenKiKoi?</h1>
            <p>
              Rất cảm ơn bạn đã sử dụng dịch vụ tại GenKiKoi. Nếu chưa, chúng tôi có những lý do sau
              để hy vọng một lúc nào đó sẽ được phục vụ bạn.
            </p>
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
                transition: { duration: 2, delay: 0.5 },
              },
            }}
            className="my-10 grid grid-cols-2 gap-10"
          >
            <div className="item-hover gap-10">
              <div className="rounded-full bg-[#f7776d] p-3">
                <EmojiHappy size={30} />
              </div>
              <div className="text-left">
                <h2 className="mb-1 text-2xl font-bold">Cam kết sự hài lòng</h2>
                <p>300+ người dùng tin tưởng</p>
              </div>
            </div>

            <div className="item-hover gap-10">
              <div className="rounded-full bg-[#406ff4] p-3">
                <Moneys size={30} />
              </div>
              <div className="text-left">
                <h2 className="mb-1 text-2xl font-bold">Thanh toán tiện lợi</h2>
                <p>Có nhiều hình thức thanh toán cho bạn tại GenKiKoi</p>
              </div>
            </div>

            <div className="item-hover gap-10">
              <div className="rounded-full bg-[#2ed67b] p-3">
                <HeartTick size={30} />
              </div>
              <div className="text-left">
                <h2 className="mb-1 text-2xl font-bold">Sạch sẽ & thân thiện</h2>
                <p>Trang thiết bị hiện đại, không gian sạch sẽ và an toàn</p>
              </div>
            </div>

            <div className="item-hover gap-10">
              <div className="rounded-full bg-[#5756d6] p-3">
                <Star size={30} />
              </div>
              <div className="text-left">
                <h2 className="mb-1 text-2xl font-bold">Khuyến mãi</h2>
                <p>Nhiều chế độ khuyến mãi cho khách hàng</p>
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
            >
              Và thêm nhiều lý do để chọn GenKiKoi
              <ArrowRight2 size={18} />
            </Button>
          </AnimatedSection>
        </div>
      </div>
      <DividerComponent />
      {/* Services */}
      <div className="section bg-blue-primary text-center text-white">
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
            <h1 className="heading-1 mb-5">Đầy đủ dịch vụ cho thú cưng của bạn</h1>
            <div className="flex justify-center gap-2">
              <p className="text-center">Tất cả đều có ở GenKiKoi</p>
              <div className="relative">
                <Heart
                  variant="Bold"
                  color="#f7776d"
                  className="absolute"
                />
                <Heart
                  variant="Bold"
                  color="#f7776d"
                  className="absolute animate-ping"
                />
              </div>
            </div>
            <div className="my-10 grid grid-cols-2 gap-5">
              <div className="item-hover gap-6">
                <div className="w-1/5">
                  <img
                    src={Icon1}
                    alt=""
                  />
                </div>
                <div className="flex-1 text-left">
                  <h2 className="mb-1 text-2xl font-bold">Tư vấn & Điều trị</h2>
                  <p>
                    Với kinh nghiệm của bác sĩ trình độ chuyên môn cao, nhiều năm kinh nghiệm làm
                    việc tại Sài Gòn.
                  </p>
                </div>
              </div>

              <div className="item-hover gap-6">
                <div className="w-1/5">
                  <img
                    src={Icon2}
                    alt=""
                  />
                </div>
                <div className="flex-1 text-left">
                  <h2 className="mb-1 text-2xl font-bold">Xét nghiệm</h2>
                  <p>Bao gồm xét nghiệm máu và xét nghiệm ký sinh trùng máu.</p>
                </div>
              </div>

              <div className="item-hover gap-6">
                <div className="w-1/5">
                  <img
                    src={Icon3}
                    alt=""
                  />
                </div>
                <div className="flex-1 text-left">
                  <h2 className="mb-1 text-2xl font-bold">Siêu âm</h2>
                  <p>Gồm có siêu âm thai và siêu âm giúp phát hiện các bệnh ở mô mềm.</p>
                </div>
              </div>

              <div className="item-hover gap-6">
                <div className="w-1/5">
                  <img
                    src={Icon4}
                    alt=""
                  />
                </div>
                <div className="flex-1 text-left">
                  <h2 className="mb-1 text-2xl font-bold">Phẫu thuật</h2>
                  <p>Đem lại những điều an toàn nhất cho thú cưng của bạn.</p>
                </div>
              </div>

              <div className="item-hover gap-6">
                <div className="w-1/5">
                  <img
                    src={Icon5}
                    alt=""
                  />
                </div>
                <div className="flex-1 text-left">
                  <h2 className="mb-1 text-2xl font-bold">Tiêm ngừa</h2>
                  <p>
                    Tiêm chủng vắc xin là biện pháp phòng bệnh truyền nhiễm đơn giản và hiệu quả
                    nhất hiện nay.
                  </p>
                </div>
              </div>

              <div className="item-hover gap-6">
                <div className="w-1/5">
                  <img
                    src={Icon6}
                    alt=""
                  />
                </div>
                <div className="flex-1 text-left">
                  <h2 className="mb-1 text-2xl font-bold">Pet Shop</h2>
                  <p>Chúng tôi cung cấp những mặt hàng thiết yếu nhất cho thú cưng của bạn.</p>
                </div>
              </div>
            </div>
            <Button
              style={{ fontSize: 18 }}
              size="large"
              type="link"
            >
              Tất cả dịch vụ tại GenKiKoi
              <ArrowRight2 size={18} />
            </Button>
          </AnimatedSection>
        </div>
      </div>

      {/* Images */}
      <div className="section bg-green-dark pb-0 text-center text-white">
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
              <div className="h-64 overflow-hidden rounded-xl duration-200 ease-in hover:-translate-y-3">
                <img
                  className="h-full w-full object-cover"
                  src={Fish1}
                  alt=""
                />
              </div>

              <div className="h-64 overflow-hidden rounded-xl duration-200 ease-in hover:-translate-y-3">
                <img
                  className="h-full w-full object-cover"
                  src={Fish2}
                  alt=""
                />
              </div>

              <div className="h-64 overflow-hidden rounded-xl duration-200 ease-in hover:-translate-y-3">
                <img
                  className="h-full w-full object-cover"
                  src={Fish3}
                  alt=""
                />
              </div>

              <div className="h-64 overflow-hidden rounded-xl duration-200 ease-in hover:-translate-y-3">
                <img
                  className="h-full w-full object-cover"
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
            >
              Thêm hình ảnh
              <ArrowRight2 size={18} />
            </Button>
          </AnimatedSection>
        </div>
        <div className="bg-green-dark">
          <svg
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              className="ux-shape-fill fill-blue-primary"
              d="M321.39 63.56c58 10.79 114.16 30.13 172 41.86 82.39 16.72 168.19 17.73 250.45.39C823.78 89 906.67 48 985.66 27.17c70.05-18.48 146.53-26.09 214.34-3V120H0V92.65a600.21 600.21 0 01321.39-29.09z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Feedbacks */}
      <div className="section bg-blue-primary text-center text-white">
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
            <h1 className="heading-1 mb-5">Được khách hàng ghi nhận</h1>
            <div className="flex justify-center gap-2">
              <p className="text-center">
                Sự hài lòng của khách hàng là thứ chúng tôi luôn mong muốn
              </p>
              <div className="relative">
                <Heart
                  variant="Bold"
                  color="#f7776d"
                  className="absolute"
                />
                <Heart
                  variant="Bold"
                  color="#f7776d"
                  className="absolute animate-ping"
                />
              </div>
            </div>
            <div className="my-10 cursor-grabbing">
              <Carousel
                infinite={true}
                autoPlay
                autoPlaySpeed={3000}
                customRightArrow={
                  <button className="absolute right-0 p-2 text-white duration-200 ease-in hover:text-blue-secondary">
                    <ArrowRight2 />
                  </button>
                }
                customLeftArrow={
                  <button className="absolute left-2 p-2 text-white duration-200 ease-in hover:text-blue-secondary">
                    <ArrowLeft2 />
                  </button>
                }
                className="p-1"
                responsive={responsive}
              >
                <div className="mx-2 flex h-full flex-col justify-between rounded-md p-5 py-10 ring-2 ring-blue-secondary">
                  <p className="mb-3 text-base">
                    Phòng khám sạch sẽ, bác sĩ giàu chuyên môn, đầy tình thương. Cá của mình đã khỏi
                    bệnh khi điều trị ở đây.
                  </p>
                  <div className="text-center">
                    <Avatar
                      src={
                        "https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/459814303_491067547104240_4335128097840496852_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFkLPxUMth0zY8u_Lg-kP6SW1_rbJpiZPNbX-tsmmJk8-SbEwZsITCc1fol_UigMd2eFc5mThQN3B2eZ_tQNa7I&_nc_ohc=O5pPqYbnb5wQ7kNvgH70-23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=AekL-CMOjRdVm_8HkR4KLye&oh=00_AYDkaJ0Kx_S9Oy_lkR51VwLbfUqYmYY1NQY13oh9tRjOEg&oe=66F2FA6B"
                      }
                      size="large"
                      className="mb-2"
                    />
                    <h3 className="font-bold">Anh Quân</h3>
                  </div>
                </div>
                <div className="mx-2 flex h-full flex-col justify-between rounded-md p-5 py-10 ring-2 ring-blue-secondary">
                  <p className="mb-3 text-base">
                    Bé con trai cưng mê anh chị ở đây lắm nè. Phòng khám hiện đại. Dễ thương. Nhiệt
                    tình. Anh mắt kính dễ thương lắm.
                  </p>
                  <div className="text-center">
                    <Avatar
                      src={
                        "https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/460530402_446786918385523_8083435999907118196_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeH4BQjwViHjCG_-ATMTSjdGQ7LYAJa7SZJDstgAlrtJkqgOV7Mc4uR4g7q6Qt6jXMdOG-dXxdBeEEAQ1A6_UlKA&_nc_ohc=8L-astVpPUcQ7kNvgEEn5QM&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=ApCp56Bg3j3Ak4L4DETUxdc&oh=00_AYDLczKfp6HxvcnRCA9xmnv6hGgz4QKCYNvuxtmqHu3rag&oe=66F2F4E0"
                      }
                      size="large"
                      className="mb-2"
                    />
                    <h3 className="font-bold">Chị Mai</h3>
                  </div>
                </div>
                <div className="mx-2 flex h-full flex-col justify-between rounded-md p-5 py-10 ring-2 ring-blue-secondary">
                  <p className="mb-3 text-base">
                    Bác sĩ từ Sài Gòn mới về làm, còn trẻ nhưng chuyên môn rất cao. Cám ơn các bác
                    sĩ rất nhiều 🥰
                  </p>
                  <div className="text-center">
                    <Avatar
                      src={
                        "https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/460328177_446787278385487_3229319296711447430_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFz6Jrx7MovR7DC2AjwihVaLP07KaPPuccs_Tspo8-5xz9DBfTBsRGTrpO_RRNEatpX4iCnoeyXfZdpLh_eMLBM&_nc_ohc=_jJ4uoy4tksQ7kNvgGr-eOq&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=A9saOgeAjNDFqe3zRHfMoXU&oh=00_AYAWjy3XWKF8sSL1AdRtQEHBi93tSBQV_Cj6bwaQHmBWSQ&oe=66F2E8DF"
                      }
                      size="large"
                      className="mb-2"
                    />
                    <h3 className="font-bold">Anh Dũng Đẹp Trai</h3>
                  </div>
                </div>
                <div className="mx-2 flex h-full flex-col justify-between rounded-md p-5 py-10 ring-2 ring-blue-secondary">
                  <p className="mb-3 text-base">
                    Anh chủ phòng khám rất dễ thương và nhiệt tình nha mn. Chữa bệnh rất giỏi nữa.
                  </p>
                  <div className="text-center">
                    <Avatar
                      src={
                        "https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/460360860_446787355052146_4729345657057364188_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeG9kGFccoejTnIanQ5C0LKRPxGSZriGhNM_EZJmuIaE06EAaw4WWCVB6IAJlfyP7tq3QoTPfIdcnntB1-sVtsgu&_nc_ohc=wYdSChICW0wQ7kNvgGnI8EK&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=Arh_mjU51Wi5_5htmX6eqpW&oh=00_AYBiDnQcIwQdlPdiN7K607VFtFQqCqHSDILHdf2qpamudA&oe=66F2E74A"
                      }
                      size="large"
                      className="mb-2"
                    />
                    <h3 className="font-bold">Anh Thép Xấu Trai</h3>
                  </div>
                </div>
              </Carousel>
            </div>
            <Button
              style={{ fontSize: 18 }}
              size="large"
              type="link"
            >
              Khách hàng nói gì về chúng tôi
              <ArrowRight2 size={18} />
            </Button>
          </AnimatedSection>
        </div>
      </div>
      <DividerComponent />

      {/* Expected */}
      <div className="section bg-blue-primary text-center text-white">
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
            <h1 className="heading-1 mb-5">Kỳ vọng gì từ GenKiKoi</h1>
            <div className="flex justify-center gap-2">
              <p className="text-center">
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
                  <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#406ff4] text-3xl font-bold">
                    1
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="mb-2 text-2xl font-bold underline underline-offset-8">Uy tín</h3>
                    <p className="text-justify">
                      Đội ngũ bác sĩ rất uy tín, có nhiều năm kinh nghiệm làm việc tại các bệnh viện
                      thú y lớn tại Sài Gòn. Được rất nhiều khách hàng tin tưởng và đánh giá cao.
                    </p>
                  </div>
                </div>

                <div className="my-6 flex gap-5">
                  <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#f2c532] text-3xl font-bold">
                    2
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="mb-2 text-2xl font-bold underline underline-offset-8">
                      Chất lượng
                    </h3>
                    <p className="text-justify">
                      GenKiKoi là phòng khám thú y chuyên về chăm sóc và điều trị cá Koi. Ở đây
                      chúng tôi luôn đặt chất lượng điều trị lên hàng đầu.
                    </p>
                  </div>
                </div>

                <div className="my-6 flex gap-5">
                  <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#f7776d] text-3xl font-bold">
                    3
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="mb-2 text-2xl font-bold underline underline-offset-8">
                      Tận tâm
                    </h3>
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

export default Home;
