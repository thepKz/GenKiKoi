import { useEffect } from "react";

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-green-dark pt-20 text-white">
      <div className="container mx-auto px-20 py-8">
        <h1 className="my-6 text-center text-4xl font-bold">Điều khoản Dịch vụ GenKiKoi</h1>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">I. Nguyên tắc chung</h2>
          <p className="mb-4">
            1.1. Chào mừng bạn đến với GenKiKoi. Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý
            với các điều khoản này.
          </p>
          <p className="mb-4">
            1.2. GenKiKoi cung cấp các dịch vụ thú y chuyên biệt cho cá Koi, bao gồm tư vấn trực
            tuyến, kiểm tra bể cá, điều trị bệnh, và các dịch vụ liên quan.
          </p>
          <p className="mb-4">
            1.3. Chúng tôi cam kết cung cấp dịch vụ chăm sóc y tế toàn diện và chuyên nghiệp cho cá
            Koi, áp dụng công nghệ và phương pháp điều trị tiên tiến nhất.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            II. Thông Tin Khách Hàng được chúng tôi thu thập
          </h2>
          <p className="mb-4">2.1. Thông tin cá nhân: Họ tên, địa chỉ, số điện thoại, email.</p>
          <p className="mb-4">
            2.2. Thông tin về cá Koi: Loại cá, tuổi, kích thước, lịch sử bệnh lý.
          </p>
          <p className="mb-4">
            2.3. Thông tin về môi trường sống của cá: Kích thước bể, chất lượng nước, hệ thống lọc.
          </p>
          <p className="mb-4">2.4. Lịch sử sử dụng dịch vụ và thanh toán tại GenKiKoi.</p>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            III. Cách thức chúng tôi bảo vệ Thông Tin Khách Hàng
          </h2>
          <p className="mb-4">
            3.1. Chúng tôi áp dụng các biện pháp bảo mật tiên tiến để bảo vệ thông tin của khách
            hàng.
          </p>
          <p className="mb-4">
            3.2. Chỉ nhân viên được ủy quyền mới có quyền truy cập vào thông tin khách hàng.
          </p>
          <p className="mb-4">
            3.3. Chúng tôi không lưu trữ thông tin thanh toán nhạy cảm như số thẻ tín dụng.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            IV. Cách thức chúng tôi sử dụng Thông Tin Khách Hàng
          </h2>
          <p className="mb-4">4.1. Cung cấp và cải thiện dịch vụ chăm sóc cá Koi.</p>
          <p className="mb-4">
            4.2. Liên hệ với khách hàng về lịch hẹn, kết quả xét nghiệm, và thông tin điều trị.
          </p>
          <p className="mb-4">
            4.3. Gửi thông tin về dịch vụ mới, chương trình khuyến mãi, và lời khuyên chăm sóc cá
            Koi.
          </p>
          <p className="mb-4">4.4. Phân tích và cải thiện chất lượng dịch vụ của chúng tôi.</p>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            V. Cách thức chúng tôi chia sẻ Thông Tin Khách Hàng
          </h2>
          <p className="mb-4">
            5.1. Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin khách hàng với bên thứ ba vì
            mục đích tiếp thị.
          </p>
          <p className="mb-4">
            5.2. Thông tin có thể được chia sẻ với đối tác cung cấp dịch vụ (như phòng xét nghiệm)
            khi cần thiết để cung cấp dịch vụ.
          </p>
          <p className="mb-4">
            5.3. Chúng tôi có thể chia sẻ thông tin theo yêu cầu của pháp luật hoặc để bảo vệ quyền
            lợi của GenKiKoi.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">VI. Truy cập và lựa chọn</h2>
          <p className="mb-4">
            6.1. Khách hàng có quyền yêu cầu truy cập, sửa đổi hoặc xóa thông tin cá nhân của mình.
          </p>
          <p className="mb-4">
            6.2. Khách hàng có thể chọn không nhận thông tin tiếp thị từ chúng tôi.
          </p>
          <p className="mb-4">
            6.3. Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi qua email hoặc số điện
            thoại được cung cấp.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            VII. Thông tin liên lạc, thông báo và sửa đổi
          </h2>
          <p className="mb-4">
            7.1. Chúng tôi có thể cập nhật Điều khoản Dịch vụ này theo thời gian. Mọi thay đổi sẽ
            được thông báo và có hiệu lực ngay khi được đăng tải.
          </p>
          <p className="mb-4">
            7.2. Nếu bạn có bất kỳ câu hỏi nào về Điều khoản Dịch vụ này, vui lòng liên hệ với
            chúng tôi qua email: support@genkikoi.com hoặc số điện thoại: 0123 456 789.
          </p>
          <p className="mb-4">
            7.3. Địa chỉ: Lô E2a-7, Đường D1, Khu Công nghệ cao, P.Long Thạnh Mỹ, Tp. Thủ Đức,
            TP.HCM.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">VIII. Chính sách đặt lịch và hoàn tiền</h2>
          <p className="mb-4">
            8.1. Đặt lịch: Khách hàng có thể đặt lịch hẹn thông qua website, ứng dụng hoặc gọi điện
            trực tiếp.
          </p>
          <p className="mb-4">
            8.2. Hủy lịch hẹn: Việc hủy hoặc thay đổi lịch hẹn phải được thực hiện ít nhất 30 phút
            trước giờ hẹn.
          </p>
          <p className="mb-4">8.3. Chính sách hoàn tiền:</p>
          <ul className="mb-4 list-disc pl-8">
            <li>Hủy lịch hẹn trước 30 phút: Hoàn tiền 100%.</li>
            <li>Không đến mà không báo trước: Không hoàn tiền.</li>
          </ul>
          <p className="mb-4">
            8.4. Trường hợp bất khả kháng: Trong trường hợp có sự kiện bất khả kháng (như thiên tai,
            dịch bệnh), chúng tôi sẽ xem xét hoàn tiền đầy đủ hoặc sắp xếp lại lịch hẹn mà không
            tính phí.
          </p>
          <p className="mb-4">
            8.5. Quy trình hoàn tiền: Tiền hoàn sẽ được chuyển về phương thức thanh toán ban đầu
            trong vòng 3-5 ngày làm việc.
          </p>
          <p className="mb-4">
            8.6. GenKiKoi có quyền từ chối phục vụ khách hàng thường xuyên hủy muộn hoặc không đến
            mà không có lý do chính đáng.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
