import { useEffect } from "react";

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="relative">
      {/* Background layer */}
      <div className="fixed inset-0 z-0">
        <div className="lg:pt-30 min-h-screen bg-gradient-to-t from-[#2A7F9E] to-[#175670] pt-32"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20 lg:px-40">
        <h1 className="mb-12 mt-10 bg-white bg-clip-text text-center text-4xl font-bold text-transparent">
          Điều khoản Dịch vụ GenKiKoi
        </h1>

        <div className="space-y-8">
          {/* Đặt lịch hẹn */}
          <div className="rounded-xl bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <h2 className="mb-6 text-2xl font-semibold text-blue-200">I. Quy định đặt lịch hẹn</h2>
            <div className="space-y-4 text-gray-200">
              <p>1.1. Thời gian đặt lịch: Tối thiểu 24 tiếng trước giờ hẹn.</p>
              <p>1.2. Mỗi khung giờ tối đa 2 lịch hẹn cho mỗi bác sĩ.</p>
              <p>1.3. Lịch hẹn sẽ tự động hủy nếu không thanh toán trong vòng 15 phút.</p>
              <p>1.4. Chỉ khách hàng đã xác thực mới có thể đặt lịch.</p>
              <p>1.5. Lịch hẹn chỉ được xác nhận khi bác sĩ còn lịch trống.</p>
            </div>
          </div>

          {/* Thanh toán và hoàn tiền */}
          <div className="rounded-xl bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <h2 className="mb-6 text-2xl font-semibold text-blue-200">
              II. Chính sách thanh toán và hoàn tiền
            </h2>
            <div className="space-y-4 text-gray-200">
              <p>2.1. Thanh toán đầy đủ trước khi xác nhận lịch hẹn.</p>
              <p>2.2. Phí di chuyển: 5,000 VND/km đối với dịch vụ tại nhà.</p>
              <p>2.3. Chính sách hoàn tiền:</p>
              <ul className="list-disc space-y-2 pl-8">
                <li>Hủy trước 24 giờ: Hoàn tiền 100%</li>
                <li>Không đến mà không báo trước: Không hoàn tiền</li>
              </ul>
            </div>
          </div>

          {/* Lịch làm việc */}
          <div className="rounded-xl bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <h2 className="mb-6 text-2xl font-semibold text-blue-200">III. Thời gian làm việc</h2>
            <div className="space-y-4 text-gray-200">
              <p>3.1. Giờ làm việc: 8:00 - 17:00</p>
              <p>3.2. Khung giờ khám:</p>
              <ul className="list-disc space-y-2 pl-8">
                <li>Sáng: 8:00 - 11:00</li>
                <li>Chiều: 13:00 - 16:00</li>
              </ul>
            </div>
          </div>

          {/* Cung cấp dịch vụ */}
          <div className="rounded-xl bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <h2 className="mb-6 text-2xl font-semibold text-blue-200">
              IV. Quy định cung cấp dịch vụ
            </h2>
            <div className="space-y-4 text-gray-200">
              <p>4.1. Tư vấn trực tuyến được thực hiện qua Google Meet.</p>
              <p>4.2. Dịch vụ tại nhà chỉ áp dụng trong khu vực quy định.</p>
              <p>4.3. Hồ sơ y tế bắt buộc ghi nhận: chẩn đoán, điều trị, thuốc.</p>
              <p>4.4. Chỉ bác sĩ được phân công mới có thể cập nhật hồ sơ.</p>
              <p>4.5. Thông số hồ cá bắt buộc: pH, ammonia, nitrate.</p>
            </div>
          </div>

          {/* Tài khoản người dùng */}
          <div className="rounded-xl bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <h2 className="mb-6 text-2xl font-semibold text-blue-200">V. Quy định tài khoản</h2>
            <div className="space-y-4 text-gray-200">
              <p>5.1. Yêu cầu mật khẩu: chữ thường, chữ hoa, số, ký tự đặc biệt.</p>
              <p>5.2. Tên người dùng: 8-30 ký tự.</p>
            </div>
          </div>

          {/* Đánh giá dịch vụ */}
          <div className="rounded-xl bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <h2 className="mb-6 text-2xl font-semibold text-blue-200">VI. Đánh giá dịch vụ</h2>
            <div className="space-y-4 text-gray-200">
              <p>6.1. Chỉ được đánh giá sau khi hoàn thành dịch vụ.</p>
              <p>6.2. Mỗi lịch hẹn chỉ được đánh giá một lần.</p>
            </div>
          </div>

          {/* Liên hệ */}
          <div className="rounded-xl bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <h2 className="mb-6 text-2xl font-semibold text-blue-200">VII. Thông tin liên hệ</h2>
            <div className="space-y-4 text-gray-200">
              <p>Email: support@genkikoi.com</p>
              <p>Hotline: 0352195876</p>
              <p>
                Địa chỉ: Lô E2a-7, Đường D1, Khu Công nghệ cao, P.Long Thạnh Mỹ, Tp. Thủ Đức, TP.HCM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
