import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  Row,
  Select,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const Consulting = () => {
  const [form] = useForm();
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
        <Form size="large" layout="vertical" form={form}>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="Tên khách">
                <Input placeholder="Tên khách" />
              </Form.Item>
              <Form.Item label="Tình trạng hồ cá">
                <Select
                  placeholder="Tình trạng hồ cá"
                  options={[
                    {
                      value: "Rất tệ",
                      label: "Rất tệ",
                    },
                    {
                      value: "Tệ",
                      label: "Tệ",
                    },
                    {
                      value: "Bình thường",
                      label: "Bình thường",
                    },
                    {
                      value: "Tốt",
                      label: "Tốt",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item label="Hình ảnh">
                <Upload accept="image/png">
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="Độ pH">
                <Input placeholder="Độ pH" />
              </Form.Item>
              <Form.Item label="Nồng độ amonia">
                <Input placeholder="Nồng độ amonia" />
              </Form.Item>
              <Form.Item label="Nồng độ nitrat">
                <Input placeholder="Nồng độ nitrat" />
              </Form.Item>
              <Form.Item label="Hàm lượng oxy">
                <Input placeholder="Hàm lượng oxy" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="Mức độ sạch sẽ">
                <Select
                  placeholder="Mức độ sạch sẽ"
                  options={[
                    {
                      value: "Rất tệ",
                      label: "Rất tệ",
                    },
                    {
                      value: "Tệ",
                      label: "Tệ",
                    },
                    {
                      value: "Bình thường",
                      label: "Bình thường",
                    },
                    {
                      value: "Tốt",
                      label: "Tốt",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item label="Tình trạng hệ thống lọc">
                <Select
                  placeholder="Tình trạng hệ thống lọc"
                  options={[
                    {
                      value: "Rất tệ",
                      label: "Rất tệ",
                    },
                    {
                      value: "Tệ",
                      label: "Tệ",
                    },
                    {
                      value: "Bình thường",
                      label: "Bình thường",
                    },
                    {
                      value: "Tốt",
                      label: "Tốt",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item label="Kích thước hồ cá">
                <Select
                  placeholder="Kích thước hồ cá"
                  options={[
                    {
                      value: "Nhỏ",
                      label: "Nhỏ (< 800 lít)",
                    },
                    {
                      value: "Vừa",
                      label: "Vừa (>= 800 lít)",
                    },
                    {
                      value: "Lớn",
                      label: "Lớn (> 1500 lít)",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item label="Nhiệt độ nước">
                <Input placeholder="Nhiệt độ nước" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Chẩn đoán">
                <Input placeholder="Chẩn đoán" />
              </Form.Item>
              <Form.Item label="Ghi chú">
                <TextArea placeholder="Ghi chú" rows={10} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <div className="w-full text-right">
              <Button type="primary">Tạo hồ sơ</Button>
            </div>
          </Row>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default Consulting;
