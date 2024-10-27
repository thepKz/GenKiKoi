import { Avatar, Button, Col, Divider, Form, Input, Row, Select } from "antd";
import { HeaderPage } from "../../components";
import { User } from "iconsax-react";

const { TextArea } = Input;

import { useRef } from "react";

const Profile = () => {
  const [form] = Form.useForm();
  const inpRef = useRef<any>();
  return (
    <div className="section">
      <HeaderPage heading="Hồ sơ cá nhân" />
      <Row gutter={32} justify="center">
        <div className="flex items-center gap-10">
          <div className="">
            <label htmlFor="inpFile">
              <Avatar
                shape="square"
                style={{
                  backgroundColor: "transparent",
                  border: "2px dashed #ccc",
                }}
                size={150}
                icon={<User color="#ccc" size={50} />}
              />
            </label>
          </div>
          <div className="">
            <h3 className="text-lg font-semibold">Image requirements:</h3>
            <ol className="">
              <li>1. Min. 400 x 400px</li>
              <li>2. Max. 2MB</li>
            </ol>
          </div>
        </div>
      </Row>
      <div className="flex h-[calc(100vh-310px)] flex-col justify-between">
        <div className="mx-24">
          <Divider />
          <Form form={form} size="large" layout="vertical">
            <Row gutter={32}>
              <Col span={12}>
                <Form.Item name="email" label="Email" required>
                  <Input disabled allowClear placeholder="Nhập email" />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="fullName"
                      label="Họ và tên"
                      hasFeedback
                      tooltip="Chỉ chữ cái và khoảng trắng, dài từ 2 đến 50 ký tự!"
                      rules={[
                        { required: true, message: "Vui lòng nhập họ và tên" },
                        {
                          min: 2,
                          message: "Họ và tên phải có ít nhất 2 ký tự",
                        },
                        {
                          max: 50,
                          message: "Họ và tên không được vượt quá 50 ký tự",
                        },
                        {
                          pattern: /^[a-zA-ZÀ-ỹ\s]+$/,
                          message:
                            "Họ và tên chỉ được chứa chữ cái và khoảng trắng",
                        },
                        {
                          validator: (_, value) => {
                            if (value && value.trim().split(/\s+/).length < 2) {
                              return Promise.reject(
                                "Họ và tên phải bao gồm ít nhất hai từ",
                              );
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                      validateDebounce={1000}
                    >
                      <Input placeholder="Họ và tên" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="gender" label="Giới tính">
                      <Select
                        placeholder="Giới tính"
                        options={[
                          { value: "nữ", label: "Nữ" },
                          { value: "nam", label: "Nam" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="phoneNumber"
                  label="Số điện thoại"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại",
                    },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Số điện thoại không hợp lệ",
                    },
                  ]}
                  validateDebounce={1000}
                >
                  <Input addonBefore="+84" placeholder="Số điện thoại" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="position" label="Vị trí">
                  <Select
                    placeholder="Vị trí"
                    disabled
                    options={[
                      {
                        value: "Hỗ trợ khách hàng",
                        label: "Hỗ trợ khách hàng",
                      },
                      { value: "Tiếp tân", label: "Tiếp tân" },
                      { value: "Trợ lý", label: "Trợ lý" },
                      { value: "Thu ngân", label: "Thu ngân" },
                    ]}
                  />
                </Form.Item>
                <Form.Item name="workShift" label="Ca làm">
                  <Select
                    placeholder="Ca làm"
                    options={[
                      { value: "Morning", label: "Ca sáng" },
                      { value: "Afternoon", label: "Ca chiều" },
                      { value: "Night", label: "Ca tối" },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="mx-24 text-right">
          <Button
            size="large"
            type="primary"
            className="mt-3 w-fit"
            onClick={() => form.submit()}
          >
            Cập nhật
          </Button>
        </div>
      </div>

      {/* Upload file */}
      <div className="hidden">
        <input
          ref={inpRef}
          type="file"
          accept="image/*"
          id="inpFile"
          // onChange={(e: any) => setFile(e.target.files[0])}
        />
      </div>
    </div>
  );
};

export default Profile;
