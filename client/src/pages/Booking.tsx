import { Button, Card, Col, ConfigProvider, Form, Input, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Calendar } from "iconsax-react";
import { useEffect } from "react";

const demoSlots = [
  { id: 1, time: "10:30" },
  { id: 2, time: "11:00" },
  { id: 3, time: "11:30" },
  { id: 4, time: "12:00" },
  { id: 5, time: "12:30" },
  { id: 6, time: "13:00" },
  { id: 7, time: "13:30" },
  { id: 8, time: "14:00" },
  { id: 9, time: "14:30" },
  { id: 10, time: "15:00" },
];

const Booking = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form] = Form.useForm();
  return (
    <div>
      <div className="bg-green-dark py-36 pb-16 text-white">
        <div className="container mx-auto lg:px-40">
          <div className="rounded-md bg-blue-primary p-5 px-10">
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: "Pro-Rounded",
                },
                components: {
                  Form: {
                    labelColor: "white",
                    fontSize: 17,
                  },
                },
              }}
            >
              <Form
                form={form}
                size="large"
                layout="vertical"
              >
                <h3 className="heading-3 text-white">Nội dung chi tiết đặt hẹn</h3>
                <div className="my-5 flex gap-10">
                  <div className="lg:w-1/5">
                    <Form.Item
                      name="typeOfConsulting"
                      label="Hình thức khám"
                      required
                    >
                      <Select
                        placeholder="Chọn hình thức khám"
                        style={{ width: "100%" }}
                        options={[
                          { value: "Tại phòng khám", label: "Tại phòng khám" },
                          { value: "Tại nhà", label: "Tại nhà" },
                          { value: "Tư vấn trực tuyến", label: "Tư vấn trực tuyến" },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      name="typeOfServices"
                      label="Loại dịch vụ"
                      required
                    >
                      <Select
                        placeholder="Chọn loại dịch vụ"
                        style={{ width: "100%" }}
                        options={[
                          { value: "Tư vấn & Điều trị", label: "Tư vấn & Điều trị" },
                          { value: "Xét nghiệm", label: "Xét nghiệm" },
                          { value: "Ký sinh trùng máu", label: "Ký sinh trùng máu" },
                          { value: "Kháng sinh đồ", label: "Kháng sinh đồ" },
                          { value: "Siêu âm", label: "Siêu âm" },
                          { value: "Phẫu thuật", label: "Phẫu thuật" },
                          { value: "Tiêm ngừa", label: "Tiêm ngừa" },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      name="vetName"
                      label="Bác sĩ"
                      required
                    >
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Chọn bác sĩ"
                        options={[
                          { value: "Bs. Đỗ Quang Dũng", label: "Bs. Đỗ Quang Dũng" },
                          { value: "Bs. Mai Tấn Thép", label: "Bs. Mai Tấn Thép" },
                          { value: "Bs. Nguyễn Văn A", label: "Bs. Nguyễn Văn A" },
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <div className="lg:w-[30%]">
                    <Form.Item
                      name="time"
                      label="Thời gian khám"
                      required
                    >
                      <div className="flex items-center justify-between gap-5">
                        <ConfigProvider
                          theme={{
                            components: {
                              Card: {
                                paddingLG: 8,
                              },
                            },
                          }}
                        >
                          <Card className="w-1/3 text-center">
                            <h2 className="text-xl font-bold">29/09</h2>
                            <p>Chủ Nhật</p>
                          </Card>
                        </ConfigProvider>
                        <ConfigProvider
                          theme={{
                            components: {
                              Card: {
                                paddingLG: 8,
                              },
                            },
                          }}
                        >
                          <Card className="w-1/3 text-center">
                            <h2 className="text-xl font-bold">30/09</h2>
                            <p>Thứ 2</p>
                          </Card>
                        </ConfigProvider>
                        <ConfigProvider
                          theme={{
                            components: {
                              Card: {
                                paddingLG: 8,
                              },
                            },
                          }}
                        >
                          <Card className="w-1/3 text-center">
                            <h2 className="text-xl font-bold">1/10</h2>
                            <p>thứ 3</p>
                          </Card>
                        </ConfigProvider>
                      </div>
                      <div className="mt-5 flex items-center gap-5">
                        <ConfigProvider
                          theme={{
                            components: {
                              Card: {
                                paddingLG: 8,
                              },
                            },
                          }}
                        >
                          <Card className="w-1/3 text-center">
                            <Calendar
                              size={28}
                              className="mx-auto"
                            />
                            <p>Ngày khác</p>
                          </Card>
                        </ConfigProvider>
                        <div className="w-1/3"></div>
                        <div className="w-1/3"></div>
                      </div>
                    </Form.Item>
                    <Form.Item
                      name="slot"
                      className="mt-5"
                    >
                      <div className="flex flex-wrap gap-4">
                        {demoSlots.map((slot) => (
                          <ConfigProvider
                            theme={{
                              components: {
                                Card: {
                                  paddingLG: 5,
                                },
                              },
                            }}
                          >
                            <Card
                              key={slot.id}
                              style={{ width: 70, textAlign: "center" }}
                            >
                              {slot.time}
                            </Card>
                          </ConfigProvider>
                        ))}
                      </div>
                    </Form.Item>
                    <p className="text-justify text-base text-white">
                      Lưu ý: Thời gian khám trên chỉ là thời gian dự kiến, tổng đài sẽ liên hệ xác
                      nhận thời gian khám chính xác tới quý khách sau khi quý khách đặt hẹn.
                    </p>
                  </div>
                  <div className="lg:flex-1">
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          required
                          name="lastName"
                          label="Họ"
                        >
                          <Input placeholder="Họ" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          required
                          name="fistName"
                          label="Tên"
                        >
                          <Input placeholder="Tên" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          required
                          name="phoneNumber"
                          label="Số điện thoại"
                        >
                          <Input
                            className="addon-input"
                            addonBefore="+84"
                            placeholder="Số điện thoại"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="gender"
                          label="Giới tính"
                        >
                          <Select
                            placeholder="Giới tính"
                            options={[
                              { value: "female", label: "Nữ" },
                              { value: "male", label: "Nam" },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={8}>
                        <Form.Item
                          name="city"
                          label="Tỉnh"
                        >
                          <Select
                            placeholder="Thành phố"
                            // value={city}
                            // onChange={(e) => {
                            //   setCity(e);
                            // }}
                            // options={cities}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name="district"
                          label="Quận / Huyện"
                        >
                          <Select
                            placeholder="Quận / Huyện"
                            // onChange={(e) => {
                            //   setDistrict(e);
                            // }}
                            // options={districts}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name="ward"
                          label="Phường / Xã"
                        >
                          <Select
                            placeholder="Phường / Xã"
                            // value={ward}
                            // onChange={(e) => setWard(e)}
                            // options={wards}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          name="address"
                          label="Địa chỉ"
                        >
                          <Input placeholder="Địa chỉ" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          required
                          name="reasons"
                          label="Lý do khám"
                        >
                          <TextArea
                            placeholder="Lý do khám"
                            rows={4}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Form>
            </ConfigProvider>
            <div className="text-right">
              <ConfigProvider
                theme={{
                  inherit: false,
                  token: {
                    fontFamily: "Pro-Rounded",
                  },
                }}
              >
                <Button
                  size="large"
                  type="primary"
                  className="mt-3 w-fit"
                >
                  Gửi thông tin
                </Button>
              </ConfigProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
