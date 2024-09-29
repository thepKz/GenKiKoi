import { AnimatedSection } from "../../share";

import { Button } from "antd";
import { ArrowRight2 } from "iconsax-react";

import WaterQuality1 from "../../assets/water-quality-1.jpg";
import WaterQuality2 from "../../assets/water-quality-2.jpg";

const WaterQuality = () => {
  return (
    <div>
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
                  src={WaterQuality1}
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
                <h1 className="heading-1">Kiểm tra chất lượng ao hồ</h1>

                <p className="my-5 text-justify">
                Việc kiểm tra và duy trì chất lượng nước ao hồ là rất quan trọng đối với sức khỏe và sự phát triển của cá Koi. 
                Cá Koi rất nhạy cảm với các thông số nước như pH, amoniac, nitrit, oxy hòa tan và nhiệt độ. 
                Kiểm tra thường xuyên giúp phát hiện sớm các vấn đề, từ đó có biện pháp xử lý kịp thời, 
                đảm bảo môi trường sống tốt nhất và giúp cá Koi phát triển khỏe mạnh, màu sắc rực rỡ.              </p>
                <Button
                  size="large"
                  ghost
                >
                  Đặt lịch
                  <ArrowRight2 size={18} />
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
      {/* Section 2 */}
      <div className="bg-green-dark">
        <svg
          viewBox="0 0 1000 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            opacity="0.15"
            fill="#0c3c54"
            d="M0 14C0 14 88.64 17.48 300 50C560 90 814 77 1003 40L1015 68L1018 104H0V14Z"
          ></path>
          <path
            opacity="0.3"
            fill="#0c3c54"
            d="M0 45C0 45 271 90.13 500 77C657 68 830 30 1015 14V100H0V45Z"
          ></path>
          <path
            fill="#0c3c54"
            d="M0 58C0 58 188.29 90 508 90C798 90 1002 55 1002 55V100H0V58Z"
          ></path>
        </svg>
        <div className="section bg-blue-primary text-center text-white">
          <div className="container mx-auto lg:px-40">
            <div className="flex items-center justify-between gap-10">
              <div className="w-1/2 text-left">
                <div className="my-5 flex flex-col gap-5 text-justify">
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
                   
                    <br/>
                    <p>
                    Cá Koi rất nhạy cảm với chất lượng nước, nước không đạt tiêu chuẩn có thể gây ra nhiều vấn đề sức khỏe,
                     từ stress, suy giảm miễn dịch đến bệnh tật và thậm chí tử vong. Ngoài ra, môi trường nước lý tưởng 
                     còn giúp cá Koi phát triển tốt, đạt kích thước tối đa và có tuổi thọ cao, đồng thời duy trì màu sắc rực rỡ 
                     và hoa văn đẹp mắt vốn là đặc trưng của loài cá này.</p>
                    <br/>
                    <p>Dịch vụ kiểm tra chất lượng nước của chúng tôi sẽ giúp bạn đảm bảo môi trường sống tốt nhất cho cá Koi của bạn. 
                    Bằng cách kiểm tra các thông số quan trọng như pH, amoniac, nitrit, 
                    oxy hòa tan và nhiệt độ, chúng tôi sẽ phát hiện sớm các vấn đề tiềm ẩn và đưa ra giải pháp kịp thời.</p>
                    <br/>
                    <p>Đừng để chất lượng nước ảnh hưởng đến sức khỏe và vẻ đẹp của cá Koi của bạn. 
                    Hãy liên hệ với GenkiKoi ngay hôm nay để được tư vấn và kiểm tra chất lượng nước!</p>
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
                    className="mx-auto w-[90%] rounded-xl object-cover"
                    src={WaterQuality2}
                    alt=""
                  />
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
        <div className="translate rotate-180">
          <svg
            viewBox="0 0 1000 300"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="h-[150px] w-full"
          >
            <path
              fill="#0c3c54"
              d="M0 300L-1 69.71C216 57 299.47 198.86 403 226C506 253 577 196 660 197C740 198 790.09 234.07 874 267C935.23 291 982 282.61 1000 277.61V300H0Z"
            ></path>
            <path
              opacity="0.5"
              fill="#0c3c54"
              d="M1 265.094L0 50.5C217 37.79 300.47 186.36 404 213.5C507 240.5 578 196.5 661 197.5C741 198.5 787.59 239.57 871.5 272.5C932.73 296.5 980.5 284.5 998.5 279.5V298.5L1 265.094Z"
            ></path>
            <path
              opacity="0.15"
              fill="#0c3c54"
              d="M0.999878 244.094L-0.00012207 27C217 14.29 300.47 173.86 404 201C507 228 578 196 661 197C741 198 787.59 243.07 871.5 276C932.73 300 980.5 284.5 998.5 279.5V299L0.999878 244.094Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WaterQuality;
