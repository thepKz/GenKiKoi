import { Button } from 'antd';
import { ArrowRight2 } from 'iconsax-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const koiServices = [
  { key: '1', service: 'Khám tổng quát', unit: 'lần', price: '500,000' },
  { key: '2', service: 'Tư vấn tại trung tâm', unit: 'lần', price: '300,000' },
  { key: '3', service: 'Kiểm tra chất lượng nước', unit: 'mẫu', price: '400,000' },
  { key: '4', service: 'Điều trị bệnh nấm', unit: 'lần', price: '600,000' },
  { key: '5', service: 'Điều trị ký sinh trùng', unit: 'lần', price: '700,000' },
  { key: '6', service: 'Tiêm vắc-xin', unit: 'con', price: '250,000' },
  { key: '7', service: 'Phẫu thuật nhỏ', unit: 'lần', price: '1,500,000' },
  { key: '8', service: 'Tư vấn thiết kế hồ', unit: 'lần', price: '2,000,000' },
  { key: '9', service: 'Điều trị stress', unit: 'lần', price: '400,000' },
  { key: '10', service: 'Cắt tỉa vây', unit: 'con', price: '300,000' },
  { key: '11', service: 'Siêu âm', unit: 'lần', price: '800,000' },
  { key: '12', service: 'Xét nghiệm máu', unit: 'mẫu', price: '600,000' },
  { key: '13', service: 'Tư vấn online', unit: '30 phút', price: '200,000' },
];

const ServicePriceTable: React.FC = () => {
  const navigate = useNavigate();

  return (
      <div className="section bg-gradient-to-t from-[#2A7F9E] to-[#175670] py-36 pt-44 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Bảng Giá Dịch Vụ Chăm Sóc Cá Koi
        </h1>
        
        <table className="w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-blue-primary text-white">
            <tr>
              <th className="py-3 px-4 text-left">STT</th>
              <th className="py-3 px-4 text-left">Tên dịch vụ</th>
              <th className="py-3 px-4 text-left">Đơn vị</th>
              <th className="py-3 px-4 text-left">Giá dịch vụ</th>
            </tr>
          </thead>
          <tbody>
            {koiServices.map((service) => (
              <tr key={service.key} className=" border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-4">{service.key}</td>
                <td className="py-3 px-4">{service.service}</td>
                <td className="py-3 px-4">{service.unit}</td>
                <td className="py-3 px-4">{service.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-4 text-white text-sm">
          * Giá có thể thay đổi tùy theo tình trạng của cá. Vui lòng liên hệ để biết thêm chi tiết.
        </p>

        <div className="text-right pr-10">
        <Button
          size="large"
          onClick={() => navigate("/booking")}
          className="ml-auto mt-8 px-8 py-6 bg-white/10 hover:bg-white/20 text-white border-none rounded-full text-lg font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105"
        >
          Đặt Lịch Ngay
          <ArrowRight2 className="animate-bounce" size={20} />
        </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicePriceTable;
