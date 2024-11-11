import { Button, message, Tag } from "antd";
import { ArrowRight2 } from "iconsax-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleAPI } from "../../apis/handleAPI";
import { getValue } from "../../utils";

const koiServices = [
  { key: "1", service: "Khám tổng quát", unit: "lần", price: "500,000" },
  { key: "2", service: "Tư vấn tại trung tâm", unit: "lần", price: "300,000" },
  { key: "3", service: "Kiểm tra chất lượng nước", unit: "mẫu", price: "400,000" },
  { key: "4", service: "Điều trị bệnh nấm", unit: "lần", price: "600,000" },
  { key: "5", service: "Điều trị ký sinh trùng", unit: "lần", price: "700,000" },
  { key: "6", service: "Tiêm vắc-xin", unit: "con", price: "250,000" },
  { key: "7", service: "Điều trị stress", unit: "lần", price: "400,000" },
  { key: "8", service: "Cắt tỉa vây", unit: "con", price: "300,000" },
  { key: "9", service: "Siêu âm", unit: "lần", price: "800,000" },
  { key: "10", service: "Xét nghiệm máu", unit: "mẫu", price: "600,000" },
  { key: "11", service: "Tư vấn online", unit: "30 phút", price: "200,000" },
];

const ServicePriceTable = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<any>([]);

  useEffect(() => {
    const getServices = async () => {
      try {
        setIsLoading(true);
        const api = `/api/services/`;
        const res = await handleAPI(api, undefined, "GET");

        if (res.data) {
          setServices(res.data);
        }
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getServices();
  }, []);

  return (
    <div className="section bg-gradient-to-t from-[#2A7F9E] to-[#175670] py-36 pt-44 text-center">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          Bảng Giá Dịch Vụ Chăm Sóc Cá Koi
        </h1>

        <table className="w-full overflow-hidden rounded-lg bg-white">
          <thead className="bg-blue-primary text-white">
            <tr>
              <th className="border-r-2 border-gray-400 px-4 py-3 text-center">STT</th>
              <th className="border-r-2 border-gray-400 px-4 py-3 text-center">Tên dịch vụ</th>
              <th className="border-r-2 border-gray-400 px-4 py-3 text-center">Khả dụng</th>
              <th className="px-4 py-3 text-center">Giá dịch vụ</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service: any, index: number) => (
              <tr
                key={index + 1}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="border-r-[1px] border-gray-200 px-4 py-3">{index + 1}</td>
                <td className="border-r-[1px] border-gray-200 px-4 py-3">{service?.serviceName}</td>
                <td className="border-r-[1px] border-gray-200 px-4 py-3">
                  {service?.availableAt.map((text: string) => (
                    <Tag color={getValue(text)}>{text}</Tag>
                  ))}
                </td>
                <td className="px-4 py-3">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(service.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-4 text-sm text-white">
          * Giá có thể thay đổi tùy theo tình trạng của cá. Vui lòng liên hệ để biết thêm chi tiết.
        </p>

        <div className="text-right">
          <Button
            size="large"
            onClick={() => navigate("/booking")}
            className="ml-auto mt-8 flex items-center gap-2 rounded-full border-none bg-white/10 px-8 py-6 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white/20"
          >
            Đặt Lịch Ngay
            <ArrowRight2
              className="animate-bounce"
              size={20}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicePriceTable;
