import { Button } from "antd";
import { ArrowRight2 } from "iconsax-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const koiServices = [
  { key: "1", service: "Khám tổng quát", unit: "lần", price: "500,000" },
  { key: "2", service: "Tư vấn tại trung tâm", unit: "lần", price: "300,000" },
  { key: "3", service: "Kiểm tra chất lượng nước", unit: "mẫu", price: "400,000" },
  { key: "4", service: "Điều trị bệnh nấm", unit: "lần", price: "600,000" },
  { key: "5", service: "Điều trị ký sinh trùng", unit: "lần", price: "700,000" },
  { key: "6", service: "Tiêm vắc-xin", unit: "con", price: "250,000" },
  { key: "7", service: "Phẫu thuật nhỏ", unit: "lần", price: "1,500,000" },
  { key: "8", service: "Tư vấn thiết kế hồ", unit: "lần", price: "2,000,000" },
  { key: "9", service: "Điều trị stress", unit: "lần", price: "400,000" },
  { key: "10", service: "Cắt tỉa vây", unit: "con", price: "300,000" },
  { key: "11", service: "Siêu âm", unit: "lần", price: "800,000" },
  { key: "12", service: "Xét nghiệm máu", unit: "mẫu", price: "600,000" },
  { key: "13", service: "Tư vấn online", unit: "30 phút", price: "200,000" },
];

const ServicePriceTable: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-green-dark px-4 pb-10 pt-28">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          Bảng Giá Dịch Vụ Chăm Sóc Cá Koi
        </h1>

        <table className="w-full overflow-hidden rounded-lg bg-white">
          <thead className="bg-blue-primary text-white">
            <tr>
              <th className="px-4 py-3 text-center">STT</th>
              <th className="px-4 py-3 text-left">Tên dịch vụ</th>
              <th className="px-4 py-3 text-left">Đơn vị</th>
              <th className="px-4 py-3 text-left">Giá dịch vụ</th>
            </tr>
          </thead>
          <tbody>
            {koiServices.map((service) => (
              <tr
                key={service.key}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="px-4 py-3 text-center">{service.key}</td>
                <td className="px-4 py-3">{service.service}</td>
                <td className="px-4 py-3">{service.unit}</td>
                <td className="px-4 py-3">{service.price}</td>
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
            ghost
            className="mt-4 text-white hover:text-blue-300"
          >
            Đặt lịch
            <ArrowRight2 size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicePriceTable;
