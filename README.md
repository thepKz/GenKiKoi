# GenKiKoi
![image](https://github.com/user-attachments/assets/4a848cf0-7e48-4eb6-8146-3a7475c217b9)
Đây là phần mềm quản lý dịch vụ thú y cho cá Koi, bao gồm tư vấn trực tuyến, kiểm tra bể cá, điều trị bệnh cá, quản lý bác sĩ và khách hàng, và đánh giá dịch vụ.

---
## Công nghệ mà chúng tôi sử dụng?
- MongoDB
- Express
- ReactJS
- Node.js

---
## Dự án này có gì?
![image](https://github.com/user-attachments/assets/0be921eb-6ff6-497f-b55e-8e16491a38d2)
## 🐟 Tính năng hệ thống GenkiKoi
### 🧑‍💻 Dành cho người dùng (Khách hàng)
1. **Xem giới thiệu về trung tâm và bác sĩ**
    - Người dùng có thể xem những thông tin giới thiệu của trung tâm và những dịch vụ nổi bật.
    - Người dùng có thể xem feedback của các khách hàng về dịch vụ ở trung tâm.
    - Xem danh sách các bác sĩ ở trung tâm và thông tin giới thiệu của từng bác sĩ.
2. **Đặt lịch hẹn dịch vụ**
    - Đặt lịch kiểm định chất lượng hồ cá.
    - Đăng ký điều trị bệnh cho cá với bác sĩ chuyên gia.
    - Dịch vụ tư vấn trực tuyến.
    - Ngoài đặt online trên website người dùng có thể nhờ nhân viên đặt dịch vụ thông qua hệ thống hoặc tới trung tâm để đặt dịch vụ.
3. **Theo dõi cuộc hẹn**
    - Xem được danh sách các cuộc hẹn đã đặt.
    - Có thể thực hiện việc hủy hẹn theo chính sách của công ty.
4. **Xem bảng giá dịch vụ**
    - Hiển thị chi tiết các loại dịch vụ và chi phí liên quan.
5. **Xem danh sách các hồ sơ**
    - Xem được danh sách hồ sơ điều trị cho từng con cá của khách hàng.
    - Xem được danh sách hồ sơ kiểm định chất lượng nước.
    - Có thể chỉnh sửa các thông tin cơ bản về con cá.
6. **Xem được lịch sử thanh toán hóa đơn**
    - Xem được những thanh toán đã thực hiện và trạng thái thanh toán.
    - Nếu cuộc hẹn chưa được thanh toán trong 15' thì sẽ có nút thanh toán tiếp cho khách hàng, sau 15' thì tự động hủy thanh toán.
8. **Đánh giá và phản hồi**
    - Đánh giá chất lượng dịch vụ.
    - Gửi phản hồi để cải thiện trải nghiệm.
9. **Cập nhật hồ sơ**
    - Khách hàng có thể cập nhật được hồ sơ cá nhân của mình bao gồm (Hình ảnh, giới tính, tên tài khoản, họ và tên, tỉnh, quận/huyện, phường/xã, địa chỉ chi tiết)
    - Người dùng có thể thay đổi mật khẩu.
    - Hệ thống hỗ trợ người dùng cập nhật lại mật khẩu khi quên.
### 🏥 Dành cho nhân viên hệ thống
### 👨‍⚕️ Bác sĩ
1. **Xem được lịch làm việc**
    - Bác sĩ xem được lịch làm việc của bản thân được trực quan hóa thông qua calendar.
    - Có nhiều chế độ xem (theo ngày, tuần, tháng).
2. **Xem được danh sách cuộc hẹn**
    - Bác sĩ xem được danh sách cuộc hẹn của mình.
    - Bác sĩ xem được chi tiết về thông tin cuộc hẹn.
    - Bác sĩ có thể xác nhận hoàn thành cuộc hẹn đó.
3. **Xem được hồ sơ khách hàng**
    - Bác sĩ có thể tra cứu hồ sơ của khách hàng (Hồ sơ điều trị, hồ sơ kiểm định chất lượng nước).
    - Bác sĩ có thể chỉnh sửa thông tin về con cá.
4. **Tạo hồ sơ bệnh án**
    - Bác sĩ có thể tạo hồ sơ khám bệnh (Hồ sơ điều trị, hồ sơ kiểm định).
    - Có thể thêm hình ảnh, ghi chú, chuẩn đoán bổ sung.
    - Có thể kê thuốc nếu cần thiết.
5. **Xem đánh giá của khách hàng**
    - Bác sĩ có thể xem danh sách đánh giá của khách hàng.
6. **Cập nhật hồ sơ**
    - Bác sĩ có thể cập nhật các thông tin của bản thân, chỉnh sửa thông tin giới thiệu về mình.
    - Bác sĩ có thể thay đổi mật khẩu.
### 👩‍💻 Nhân viên
1. **Xem được lịch làm việc của bác sĩ**
    - Nhân viên có thể xem được lịch làm việc của bác sĩ được trực quan hóa thông qua calendar.
    - Có nhiều chế độ xem (theo ngày, tuần, tháng).
    - Nhân viên có thể chỉnh sửa lịch làm việc của bác sĩ.
2. **Xem được lịch hẹn của khách hàng**
    - Nhân viên có thể xem được danh sách các cuộc hẹn của từng khách hàng.
    - Nhân viên có thể hủy lịch hẹn của khách hàng kèm theo lý do hủy lịch (Khi đã thống nhất với khách hàng và tuân theo quy định của công ty)
3. **Đặt lịch hẹn**
    - Nhân viên có thể đặt cuộc hẹn hộ khách hàng tại trung tâm.
    - Nhân viên xác nhận khách hàng đã thanh toán chi phí và tiến hành xác nhận tạo cuộc hẹn.
4. **Cập nhật hồ sơ**
    - Nhân viên có thể cập nhật các thông tin của bản thân.
    - Nhân viên có thể thay đổi mật khẩu.
### 👨‍💼 Quản lý
1. **Dashboard**
    - Quản lý có xem toàn diện về hệ thống:
        - Tổng doanh thu
        - Tổng đặt lịch
        - Tổng khách hàng
        - Biểu đồ doanh thu theo ngày
        - Biểu đồ số lượng cuộc hẹn được đặt theo ngày
        - Top 5 dịch vụ bán chạy
        - Top 5 khách hàng VIP
2. **Quản lý danh sách dịch vụ**
    - Quản lý có thể thêm, xóa, sửa dịch vụ.
3. **Quản lý danh sách nhân viên**
    - Quản lý có thể thêm, xóa, sửa nhân viên.
    - Quản lý có thể thêm, xóa, sửa bác sĩ.
4. **Xem được lịch làm việc của bác sĩ**
    - Quản lý có thể xem được lịch làm việc của bác sĩ được trực quan hóa thông qua calendar.
    - Có nhiều chế độ xem (theo ngày, tuần, tháng).
    - Quản lý có thể chỉnh sửa lịch làm việc của bác sĩ.
5. **Xem được lịch hẹn của khách hàng**
    - Quản lý có thể xem được danh sách các cuộc hẹn của từng khách hàng.
    - Quản lý có thể hủy lịch hẹn của khách hàng kèm theo lý do hủy lịch (Khi đã thống nhất với khách hàng và tuân theo quy định của công ty).
6. **Quản lý tài khoản trong hệ thống**
    - Có thể vô hiệu hóa hoặc bỏ vô hiệu hóa với tài khoản bất kỳ (ngoại trừ quản lý).
7. **Cập nhật hồ sơ**
    - Quản lý có thể cập nhật các thông tin của bản thân.
    - Quản lý có thể thay đổi mật khẩu.
