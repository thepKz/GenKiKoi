import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  Row,
  Select,
  Tag,
} from "antd";
import { Calendar as Cal, User } from "iconsax-react";
import { Link } from "react-router-dom";
import { getValue } from "../../utils";

const AssignCalendar = () => {
  const [form] = Form.useForm();
  return (
    <ConfigProvider
      theme={{
        components: {
          Divider: {
            marginLG: 10,
          },
        },
      }}
    >
      <div className="section">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: (
                <Link to="/staff/doctor-calendar">
                  <div className="flex items-center gap-2">
                    <Cal size={20} />
                    Lịch làm việc của bác sĩ
                  </div>
                </Link>
              ),
            },
            {
              title: (
                <Link to="/staff/doctor-calendar">Chỉnh lịch làm việc</Link>
              ),
            },
            {
              title: "Bs. Đỗ Quang Dũng",
            },
          ]}
        />
        <div className="flex h-[calc(100vh-120px)] flex-col justify-between">
          <Form size="large" layout="vertical">
            <Row gutter={32} className="mt-3">
              <Col span={8}>
                <div className="">
                  <h4 className="heading-4">Thông tin chung</h4>
                  <Divider />
                  <div className="flex flex-col gap-2">
                    <Avatar
                      shape="square"
                      style={{
                        backgroundColor: "transparent",
                        border: "2px dashed #ccc",
                        margin: "20px auto",
                      }}
                      size={150}
                      icon={<User color="#ccc" size={50} />}
                    />
                    <p>
                      <span className="font-semibold">Họ và tên: </span> Đỗ
                      Quang Dũng
                    </p>
                    <p>
                      <span className="font-semibold">Email: </span>{" "}
                      doquangdung1782004@gmail.com
                    </p>
                    <p>
                      <span className="font-semibold">Giới tính: </span>{" "}
                      {true ? (
                        <Tag color={getValue("nam")}>Nam</Tag>
                      ) : (
                        <Tag color={getValue("nữ")}>Nữ</Tag>
                      )}
                    </p>
                    <p>
                      <span className="font-semibold">
                        Ngày bắt đầu công việc:{" "}
                      </span>{" "}
                      1/1/2024
                    </p>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="">
                  <h4 className="heading-4">Chỉnh lịch</h4>
                  <Divider />
                  <div className="gap-2">
                    <Form.Item label="Ngày làm việc">
                      <DatePicker
                        placeholder="Chọn ngày"
                        maxTagCount="responsive"
                        multiple
                      />
                    </Form.Item>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="">
                  <h4 className="heading-4">Di chuyển</h4>
                  <Divider />
                  <div className="">
                    <Form.Item label="Di chuyển">
                      <Select
                        placeholder="Di chuyển"
                        options={[
                          {
                            value: true,
                            label: "Có",
                          },
                          {
                            value: false,
                            label: "Không",
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
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
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AssignCalendar;
