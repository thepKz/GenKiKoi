import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  message,
  Row,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IAuth } from "../../../types";
import { handleAPI } from "../../../apis/handleAPI";
import { uploadFile } from "../../../utils";

const { TextArea } = Input;

const Consulting = () => {
  const [form] = useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);

      if (fileList.length > 0) {
        const uploadedFiles = await Promise.all(
          fileList.map(async (file) => {
            if (file.originFileObj) {
              const url = await uploadFile(file.originFileObj, "ponds");
              return url;
            }
            return null;
          }),
        );
        values.images = uploadedFiles.filter((file) => file !== null);
      }

      values.doctorId = auth.adminId;

      const api = `/api/ponds/`;
      const res: any = await handleAPI(api, values, "POST");

      message.success(res.message);
      form.resetFields();
      setFileList([]);
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Bạn chỉ có thể tải lên file JPG/PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Hình ảnh phải nhỏ hơn 2MB!");
    }
    return false;
  };

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Form: {
              marginLG: 16,
            },
          },
        }}
      >
        <div className="flex h-[calc(100vh-210px)] flex-col justify-between">
          <Form
            onFinish={handleSubmit}
            disabled={isLoading}
            form={form}
            size="large"
            layout="vertical"
          >
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item
                  name="phoneNumber"
                  label="Số điện thoại"
                  hasFeedback
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                    {
                      pattern: /^(0[3|5|7|8|9])+([0-9]{8})\b/,
                      message: "Số điện thoại không hợp lệ",
                    },
                  ]}
                  validateDebounce={1000}
                >
                  <Input
                    addonBefore={
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 30 20"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                      >
                        <rect width="30" height="20" fill="#da251d" rx={3} />
                        <polygon
                          points="15,4 11.47,14.85 20.71,8.15 9.29,8.15 18.53,14.85"
                          fill="#ff0"
                        />
                      </svg>
                    }
                    placeholder="Số điện thoại"
                  />
                </Form.Item>
                <Form.Item
                  name="status"
                  label="Tình trạng hồ cá"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn tình trạng hồ cá",
                    },
                  ]}
                >
                  <Select
                    placeholder="Tình trạng hồ cá"
                    options={[
                      { value: "Rất tệ", label: "Rất tệ" },
                      { value: "Tệ", label: "Tệ" },
                      { value: "Bình thường", label: "Bình thường" },
                      { value: "Tốt", label: "Tốt" },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label="Hình ảnh"
                  tooltip="Chỉ tải lên được tối đa 4 hình ảnh"
                >
                  <Upload
                    accept="image/png, image/jpeg"
                    fileList={fileList}
                    beforeUpload={beforeUpload}
                    onChange={handleUpload}
                    maxCount={4}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  name="ph"
                  label="Độ pH"
                  rules={[{ required: true, message: "Không để trống" }]}
                >
                  <Input placeholder="Độ pH" />
                </Form.Item>
                <Form.Item
                  name="ammoniaLevel"
                  label="Nồng độ amonia"
                  rules={[{ required: true, message: "Không để trống" }]}
                >
                  <Input placeholder="Nồng độ amonia" />
                </Form.Item>
                <Form.Item
                  name="nitrateLevel"
                  label="Nồng độ nitrat"
                  rules={[{ required: true, message: "Không để trống" }]}
                >
                  <Input placeholder="Nồng độ nitrat" />
                </Form.Item>
                <Form.Item
                  name="oxygenLevel"
                  label="Hàm lượng oxy"
                  rules={[{ required: true, message: "Không để trống" }]}
                >
                  <Input placeholder="Hàm lượng oxy" />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  name="cleanliness"
                  label="Mức độ sạch sẽ"
                  rules={[{ required: true, message: "Không để trống" }]}
                >
                  <Select
                    placeholder="Mức độ sạch sẽ"
                    options={[
                      { value: "Rất tệ", label: "Rất tệ" },
                      { value: "Tệ", label: "Tệ" },
                      { value: "Bình thường", label: "Bình thường" },
                      { value: "Tốt", label: "Tốt" },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  name="filtrationSystem"
                  label="Hệ thống lọc"
                  rules={[{ required: true, message: "Không để trống" }]}
                >
                  <Select
                    placeholder="Kích cỡ"
                    options={[
                      { value: "Nhỏ", label: "Nhỏ" },
                      { value: "Vừa", label: "Vừa" },
                      { value: "Lớn", label: "Lớn" },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  name="pondSize"
                  label="Kích thước hồ cá"
                  rules={[{ required: true, message: "Không để trống" }]}
                >
                  <Input placeholder="Kích thước hồ cá" />
                </Form.Item>
                <Form.Item
                  name="waterTemperature"
                  label="Nhiệt độ nước"
                  rules={[{ required: true, message: "Không để trống" }]}
                >
                  <Input placeholder="Nhiệt độ nước" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="diagnosis" label="Chẩn đoán">
                  <Input placeholder="Chẩn đoán" />
                </Form.Item>
                <Form.Item name="notes" label="Ghi chú">
                  <TextArea placeholder="Ghi chú" rows={10} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div className="text-right">
            <Button
              loading={isLoading}
              onClick={() => form.submit()}
              size="large"
              type="primary"
            >
              Tạo hồ sơ
            </Button>
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default Consulting;
