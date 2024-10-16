import {
  Alert,
  Avatar,
  Button,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Upload,
} from "antd";
import { User } from "iconsax-react";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

import { useRef } from "react";

const Profile = () => {
  const [form] = Form.useForm();
  const inpRef = useRef<any>();

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            itemMarginBottom: 10,
          },
        },
      }}
    >
      <div className="container mx-auto my-5 h-[calc(100vh-115px)] rounded-md bg-white p-5 shadow-sm lg:w-[95%]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="heading-3">Hồ sơ cá nhân</h1>
        </div>
        {/* Divider */}
        <Divider />

        <Row gutter={32}>
          <Col span={6}>
            <div className="my-5 mb-10 text-center">
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
            <Divider />
            <div className="">
              <h4 className="mb-2 text-base font-semibold">
                Upload hình ảnh chứng chỉ
              </h4>

              <Alert
                message="Giấy phép phải được cấp bởi các cơ quan được bộ y tế cấp
                    phép!"
                type="warning"
                showIcon
              />
              <div className="mt-3">
                <Upload accept="image/png">
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </div>
            </div>
          </Col>
          <Col span={18}>
            <Form form={form} size="large" layout="vertical">
              <Row gutter={32}>
                <Col span={6}>
                  <Form.Item name="email" label="Email" required>
                    <Input disabled allowClear placeholder="Nhập email" />
                  </Form.Item>
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
                <Col span={6}>
                  <Form.Item name="specialization" label="Chứng chỉ" required>
                    <Input placeholder="Tên chứng chỉ" />
                  </Form.Item>
                  <Form.Item
                    name="licenseNumber"
                    label="Mã số chứng chỉ"
                    required
                  >
                    <Input placeholder="Mã số chứng chỉ" />
                  </Form.Item>
                  <Form.Item
                    name="movingService"
                    label="Dịch vụ di động"
                    required
                  >
                    <Select
                      placeholder="Chọn dịch vụ di động"
                      options={[
                        { value: true, label: "Có" },
                        { value: false, label: "Không" },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    name="yearOfExperience"
                    label="Năm kinh nghiệm"
                    required
                  >
                    <Input placeholder="Số năm kinh nghiệm" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    tooltip="Hãy giới thiệu một các đầy đủ rõ ràng về bản thân của mình!"
                    label="Giới thiệu"
                  >
                    <TextArea placeholder="Giới thiệu về bản thân" rows={16} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <div className="text-right">
          <Button
            size="large"
            type="primary"
            className="mt-3 w-fit"
            onClick={() => form.submit()}
          >
            Cập nhật
          </Button>
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
    </ConfigProvider>
  );
};

export default Profile;
