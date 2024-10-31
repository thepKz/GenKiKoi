import { Button } from "antd";
import Fish4 from "../../assets/fish-care-4.jpg";
import { ArrowRight2, Heart } from "iconsax-react";
import { AnimatedSection, DividerComponent } from "../../share";

import Icon1 from "../../assets/Icon-01.svg";
import Icon2 from "../../assets/Icon-02.svg";
import Icon3 from "../../assets/Icon-03.svg";
import Icon4 from "../../assets/Icon-04.svg";
import Icon5 from "../../assets/Icon-05.svg";
import Icon6 from "../../assets/Icon-06.svg";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="">
      {/* Section 1 */}
      <div className="section bg-green-dark py-36 pt-44 text-center text-white">
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
                  src={Fish4}
                  className="rounded-xl"
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
                <h1 className="heading-1">Đầy đủ tại GenKiKoi</h1>

                <div className="my-5 flex flex-col gap-5 text-justify">
                  <p>
                    Bạn vẫn còn băn khoăn trong việc tìm một địa chỉ uy tín cho thú cưng của mình ?
                  </p>
                  <p>
                    Bạn muốn được tư vấn bởi một bác sĩ thú y tận tâm, làm việc không mệt mỏi chỉ để
                    đảm bảo sức khoẻ cho thú cưng của bạn một cách tốt nhất ?
                  </p>
                  <p>
                    GenKiKoi là phòng khám thú y tập trung về chất lượng điều trị và chăm sóc đặc
                    biệt cho thú cưng. Chúng tôi cam kết đảm bảo an toàn đi cùng chất lượng dịch vụ
                    cao nhất để khách hàng luôn cảm thấy hài lòng khi đến với GenKiKoi.
                  </p>
                </div>
                <Button
                  size="large"
                  ghost
                  onClick={() => navigate("/booking")}
                  className="mt-4 text-white hover:text-blue-300"
                >
                  Đặt lịch
                  <ArrowRight2 size={18} />
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>

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
      <DividerComponent />
    </div>
  );
};

export default Services;
