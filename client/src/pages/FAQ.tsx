import { Collapse, CollapseProps } from "antd";
import { useEffect } from "react";

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Trung tâm của bạn có cung cấp dịch vụ gì cho cá Koi?",
    children: (
      <div className="">
        Chúng tôi cung cấp các dịch vụ chăm sóc thú y chuyên nghiệp cho cá Koi bao gồm:
        <ul className="ml-10 list-disc">
          <li>Tư vấn trực tuyến với bác sĩ thú y.</li>
          <li>Đánh giá chất lượng nước và môi trường sống cho cá.</li>
          <li>Điều trị bệnh tại nhà hoặc tại trung tâm.</li>
          <li>Kiểm định chất lượng hồ cá và đề xuất cải thiện môi trường sống.</li>
        </ul>
      </div>
    ),
  },
  {
    key: "2",
    label: "Giờ hoạt động của trung tâm là khi nào?",
    children: (
      <p>
        Trung tâm chúng tôi hoạt động từ 8:00 AM đến 6:00 PM, từ Thứ Hai đến Thứ Bảy. Tuy nhiên, đối
        với các trường hợp khẩn cấp hoặc yêu cầu đặc biệt, bạn có thể liên hệ trước để đặt lịch
        ngoài giờ.
      </p>
    ),
  },
  {
    key: "3",
    label: "Trung tâm có chính sách bảo hành cho dịch vụ không?",
    children: (
      <p>
        Chúng tôi có chính sách hỗ trợ sau dịch vụ trong vòng 7 ngày kể từ ngày hoàn thành điều trị
        hoặc kiểm định. Nếu bạn gặp bất kỳ vấn đề gì sau khi sử dụng dịch vụ, hãy liên hệ ngay để
        được hỗ trợ kịp thời.
      </p>
    ),
  },
];

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="section bg-green-dark py-36 pt-44 text-white">
        <div className="mx-auto w-[45%]">
          <h1 className="heading-2 text-center">Những câu hỏi thường gặp</h1>
          <div className="mt-10">
            <Collapse
              items={items}
              defaultActiveKey={["1"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default FAQ;