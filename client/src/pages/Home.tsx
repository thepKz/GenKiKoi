import { Button, Divider } from "antd";
import Background from "../assets/background.png";
import {
  ArrowRight2,
  EmojiHappy,
  Heart,
  HeartTick,
  Moneys,
  Star,
} from "iconsax-react";

import Image1 from "../assets/Image1.png";
import Image2 from "../assets/Image2.png";
import Image3 from "../assets/Image3.png";
import { DividerComponent } from "../share";

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

const Home = () => {
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
          <div className="mt-20 w-2/5">
            <h1 className="text-5xl font-bold">Hơn cả sự hài lòng.</h1>
            <p className="py-8 text-justify text-base">
              GenKiKoi là tập thể những người trẻ, đầy nhiệt huyết và giàu kinh
              nghiệm trong lĩnh vực điều trị và chăm sóc cho cá Koi. <br />
              Tôn chỉ của chúng tôi là Uy tín – Chất lượng – Tận tâm.
            </p>
            <Button ghost size="large" type="primary">
              Về GenKiKoi
              <ArrowRight2 size={18} />
            </Button>
          </div>
          <div className="flex w-3/5 items-center justify-center gap-[-25px]">
            <img className="w-1/3" src={Image1} alt="" />
            <img className="w-1/3" src={Image2} alt="" />
            <img className="w-1/3" src={Image3} alt="" />
          </div>
        </div>
      </div>
      {/* Why? Section */}
      <div className="section bg-blue-primary text-center text-white">
        <div className="container mx-auto lg:px-40">
          <h1 className="mb-5 text-5xl font-bold">Tại sao chọn GenKiKoi?</h1>
          <p>
            Rất cảm ơn bạn đã sử dụng dịch vụ tại GenKiKoi. Nếu chưa, chúng tôi
            có những lý do sau để hy vọng một lúc nào đó sẽ được phục vụ bạn.
          </p>
          <div className="my-10 grid grid-cols-2 gap-10">
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
                <h2 className="mb-1 text-2xl font-bold">
                  Sạch sẽ & thân thiện
                </h2>
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
          </div>

          <Button style={{ fontSize: 18 }} size="large" type="link">
            Và thêm nhiều lý do để chọn GenKiKoi
            <ArrowRight2 size={18} />
          </Button>
        </div>
      </div>
      <DividerComponent />
      {/* Services */}
      <div className="section bg-blue-primary text-center text-white">
        <div className="container mx-auto lg:px-40">
          <h1 className="mb-5 text-5xl font-bold">
            Đầy đủ dịch vụ cho thú cưng của bạn.
          </h1>
          <div className="flex justify-center gap-2">
            <p className="text-center">Tất cả đều có ở GenKiKoi</p>
            <div className="relative">
              <Heart variant="Bold" color="#f7776d" className="absolute" />
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
                <img src={Icon1} alt="" />
              </div>
              <div className="flex-1 text-left">
                <h2 className="mb-1 text-2xl font-bold">Tư vấn & Điều trị</h2>
                <p>
                  Với kinh nghiệm của bác sĩ trình độ chuyên môn cao, nhiều năm
                  kinh nghiệm làm việc tại Sài Gòn.
                </p>
              </div>
            </div>

            <div className="item-hover gap-6">
              <div className="w-1/5">
                <img src={Icon2} alt="" />
              </div>
              <div className="flex-1 text-left">
                <h2 className="mb-1 text-2xl font-bold">Xét nghiệm</h2>
                <p>Bao gồm xét nghiệm máu và xét nghiệm ký sinh trùng máu.</p>
              </div>
            </div>

            <div className="item-hover gap-6">
              <div className="w-1/5">
                <img src={Icon3} alt="" />
              </div>
              <div className="flex-1 text-left">
                <h2 className="mb-1 text-2xl font-bold">Siêu âm</h2>
                <p>
                  Gồm có siêu âm thai và siêu âm giúp phát hiện các bệnh ở mô
                  mềm.
                </p>
              </div>
            </div>

            <div className="item-hover gap-6">
              <div className="w-1/5">
                <img src={Icon4} alt="" />
              </div>
              <div className="flex-1 text-left">
                <h2 className="mb-1 text-2xl font-bold">Phẫu thuật</h2>
                <p>Đem lại những điều an toàn nhất cho thú cưng của bạn.</p>
              </div>
            </div>

            <div className="item-hover gap-6">
              <div className="w-1/5">
                <img src={Icon5} alt="" />
              </div>
              <div className="flex-1 text-left">
                <h2 className="mb-1 text-2xl font-bold">Tiêm ngừa</h2>
                <p>
                  Tiêm chủng vắc xin là biện pháp phòng bệnh truyền nhiễm đơn
                  giản và hiệu quả nhất hiện nay.
                </p>
              </div>
            </div>

            <div className="item-hover gap-6">
              <div className="w-1/5">
                <img src={Icon6} alt="" />
              </div>
              <div className="flex-1 text-left">
                <h2 className="mb-1 text-2xl font-bold">Pet Shop</h2>
                <p>
                  Chúng tôi cung cấp những mặt hàng thiết yếu nhất cho thú cưng
                  của bạn.
                </p>
              </div>
            </div>
          </div>
          <Button style={{ fontSize: 18 }} size="large" type="link">
            Tất cả dịch vụ tại GenKiKoi
            <ArrowRight2 size={18} />
          </Button>
        </div>
      </div>
      {/* Images */}
      <div className="section bg-green-dark pb-0 text-center text-white">
        <div className="container mx-auto lg:px-40">
          <h1 className="mb-5 text-5xl font-bold">
            Hình ảnh hoạt động tại GenKiKoi
          </h1>
          {/* Images list */}
          <div className="my-20 grid grid-cols-4 gap-5">
            <div className="h-64 overflow-hidden rounded-xl duration-200 ease-in hover:-translate-y-3">
              <img className="h-full w-full object-cover" src={Fish1} alt="" />
            </div>

            <div className="h-64 overflow-hidden rounded-xl duration-200 ease-in hover:-translate-y-3">
              <img className="h-full w-full object-cover" src={Fish2} alt="" />
            </div>

            <div className="h-64 overflow-hidden rounded-xl duration-200 ease-in hover:-translate-y-3">
              <img className="h-full w-full object-cover" src={Fish3} alt="" />
            </div>

            <div className="h-64 overflow-hidden rounded-xl duration-200 ease-in hover:-translate-y-3">
              <img className="h-full w-full object-cover" src={Fish4} alt="" />
            </div>
          </div>
          <Button
            style={{ fontSize: 18 }}
            size="large"
            type="link"
          >
            Thêm hình ảnh
            <ArrowRight2 size={18} />
          </Button>
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

      {/* Services */}
      <div className="section bg-blue-primary text-center text-white">
        <div className="container mx-auto lg:px-40">
          <h1 className="mb-5 text-5xl font-bold">
            Đầy đủ dịch vụ cho thú cưng của bạn.
          </h1>
          <div className="flex justify-center gap-2">
            <p className="text-center">Tất cả đều có ở GenKiKoi</p>
            <div className="relative">
              <Heart variant="Bold" color="#f7776d" className="absolute" />
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
                <img src={Icon1} alt="" />
              </div>
              <div className="flex-1 text-left">
                <h2 className="mb-1 text-2xl font-bold">Tư vấn & Điều trị</h2>
                <p>
                  Với kinh nghiệm của bác sĩ trình độ chuyên môn cao, nhiều năm
                  kinh nghiệm làm việc tại Sài Gòn.
                </p>
              </div>
            </div>

            <div className="item-hover gap-6">
              <div className="w-1/5">
                <img src={Icon2} alt="" />
              </div>
              <div className="flex-1 text-left">
                <h2 className="mb-1 text-2xl font-bold">Xét nghiệm</h2>
                <p>Bao gồm xét nghiệm máu và xét nghiệm ký sinh trùng máu.</p>
              </div>
            </div>

            <div className="item-hover gap-6">
              <div className="w-1/5">
                <img src={Icon3} alt="" />
              </div>
              <div className="flex-1 text-left">
                <h2 className="mb-1 text-2xl font-bold">Siêu âm</h2>
                <p>
                  Gồm có siêu âm thai và siêu âm giúp phát hiện các bệnh ở mô
                  mềm.
                </p>
              </div>
            </div>

            <div className="item-hover gap-6">
              <div className="w-1/5">
                <img src={Icon4} alt="" />
              </div>
              <div className="flex-1 text-left">
                <h2 className="mb-1 text-2xl font-bold">Phẫu thuật</h2>
                <p>Đem lại những điều an toàn nhất cho thú cưng của bạn.</p>
              </div>
            </div>

            <div className="item-hover gap-6">
              <div className="w-1/5">
                <img src={Icon5} alt="" />
              </div>
              <div className="flex-1 text-left">
                <h2 className="mb-1 text-2xl font-bold">Tiêm ngừa</h2>
                <p>
                  Tiêm chủng vắc xin là biện pháp phòng bệnh truyền nhiễm đơn
                  giản và hiệu quả nhất hiện nay.
                </p>
              </div>
            </div>

            <div className="item-hover gap-6">
              <div className="w-1/5">
                <img src={Icon6} alt="" />
              </div>
              <div className="flex-1 text-left">
                <h2 className="mb-1 text-2xl font-bold">Pet Shop</h2>
                <p>
                  Chúng tôi cung cấp những mặt hàng thiết yếu nhất cho thú cưng
                  của bạn.
                </p>
              </div>
            </div>
          </div>
          <Button style={{ fontSize: 18 }} size="large" type="link">
            Tất cả dịch vụ tại GenKiKoi
            <ArrowRight2 size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
