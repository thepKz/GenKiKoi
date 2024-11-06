import { Collapse, CollapseProps } from "antd";
import { useEffect } from "react";
import { AnimatedSection } from "../share";

const faqItems: CollapseProps["items"] = [
  {
    key: "1",
    label: (
      <span className="text-lg font-medium text-white">
        Trung tâm của bạn có cung cấp dịch vụ gì cho cá Koi?
      </span>
    ),
    children: (
      <div className="bg-white/5 rounded-lg p-4 mt-2">
        <div className="text-white/80">
          Chúng tôi cung cấp các dịch vụ chăm sóc thú y chuyên nghiệp cho cá Koi bao gồm:
          <ul className="ml-10 list-disc mt-2 space-y-2">
            <li>Tư vấn trực tuyến với bác sĩ thú y</li>
            <li>Đánh giá chất lượng nước và môi trường sống cho cá</li>
            <li>Điều trị bệnh tại nhà hoặc tại trung tâm</li>
            <li>Kiểm định chất lượng hồ cá và đề xuất cải thiện môi trường sống</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <span className="text-lg font-medium text-white">
        Giờ hoạt động của trung tâm là khi nào?
      </span>
    ),
    children: (
      <div className="bg-white/5 rounded-lg p-4 mt-2">
        <p className="text-white/90">
          Trung tâm chúng tôi hoạt động từ 8:00 AM đến 6:00 PM, từ Thứ Hai đến Thứ Bảy. 
          Tuy nhiên, đối với các trường hợp khẩn cấp hoặc yêu cầu đặc biệt, 
          bạn có thể liên hệ trước để đặt lịch ngoài giờ.
        </p>
      </div>
    ),
  },
  {
    key: "3",
    label: (
      <span className="text-lg font-medium text-white">
        Trung tâm có chính sách bảo hành cho dịch vụ không?
      </span>
    ),
    children: (
      <div className="bg-white/5 rounded-lg p-4 mt-2">
        <p className="text-white/90">
          Chúng tôi có chính sách hỗ trợ sau dịch vụ trong vòng 7 ngày kể từ ngày hoàn thành điều trị
          hoặc kiểm định. Nếu bạn gặp bất kỳ vấn đề gì sau khi sử dụng dịch vụ, hãy liên hệ ngay để
          được hỗ trợ kịp thời.
        </p>
      </div>
    ),
  },
  {
    key: "4",
    label: (
      <span className="text-lg font-medium text-white">
        Làm thế nào để đặt lịch tư vấn?
      </span>
    ),
    children: (
      <div className="bg-white/5 rounded-lg p-4 mt-2">
        <p className="text-white/90">
          Bạn có thể đặt lịch tư vấn thông qua:
          <ul className="ml-10 list-disc mt-2 space-y-2">
            <li>Đặt lịch trực tiếp trên website</li>
            <li>Gọi điện đến hotline: 0123.456.789</li>
            <li>Nhắn tin qua Fanpage Facebook của chúng tôi</li>
          </ul>
        </p>
      </div>
    ),
  },
  {
    key: "5",
    label: (
      <span className="text-lg font-medium text-white">
        Chi phí cho các dịch vụ như thế nào?
      </span>
    ),
    children: (
      <div className="bg-white/5 rounded-lg p-4 mt-2">
        <p className="text-white/90">
          Chi phí sẽ phụ thuộc vào loại dịch vụ và nhu cầu cụ thể của bạn. 
          Chúng tôi cam kết mức giá cạnh tranh và minh bạch. 
          Vui lòng liên hệ trực tiếp để được tư vấn chi tiết về chi phí.
        </p>
      </div>
    ),
  },
];

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      <div className="min-h-screen pt-32 lg:pt-30 bg-gradient-to-t from-[#2A7F9E] to-[#175670]">
        <div className="container mx-auto px-4 lg:px-40">
          <AnimatedSection
            variants={{
              hidden: { opacity: 0, y: -50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.5, delay: 0.5 },
              },
            }}
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Câu Hỏi Thường Gặp
              </h1>
              <p className="text-xl text-blue-100">
                Những thắc mắc phổ biến về dịch vụ của chúng tôi
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.5, delay: 0.7 },
              },
            }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-20 hover:bg-white/15 transition-all duration-300">
              <Collapse
                items={faqItems}
                className="custom-collapse"
                expandIconPosition="end"
                size="large"
                style={{
                  background: 'transparent',
                  border: 'none'
                }}
                bordered={false}
              />
            </div>
          </AnimatedSection>

          {/* Contact Section */}
          <AnimatedSection
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.5, delay: 0.9 },
              },
            }}
          >
            <div className="text-center pb-20">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Vẫn còn thắc mắc?
              </h2>
              <p className="text-lg text-blue-100 mb-6">
                Đừng ngần ngại liên hệ với chúng tôi để được giải đáp
              </p>
              <div className="flex justify-center gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-2 text-white">Hotline</h3>
                  <p className="text-white/90">0123.456.789</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-2 text-white">Email</h3>
                  <p className="text-white/90">support@genkikoi.com</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default FAQ;