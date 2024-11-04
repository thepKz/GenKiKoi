import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  message,
  Row,
  Select,
  Spin,
  Tag,
} from "antd";
import dayjs from "dayjs";
import { Calendar as Cal, User } from "iconsax-react";
import { Link, useLocation } from "react-router-dom";
import { getValue } from "../../utils";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";

const AssignCalendar = () => {
  const [form] = Form.useForm();
  const { pathname } = useLocation();
  const doctorId = pathname.split("/")[4];
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false);
  const [doctor, setDoctor] = useState<any>(null);

  useEffect(() => {
    const getDoctor = async () => {
      try {
        setIsLoading(true);
        const api = `/api/doctors/${doctorId}/schedule`;
        const res = await handleAPI(api, undefined, "GET");
        setDoctor(res.data);
      } catch (error) {
        console.error(error);
        message.error("Không thể lấy thông tin lịch bác sĩ");
      } finally {
        setIsLoading(false);
      }
    };
    getDoctor();
  }, [doctorId]);

  useEffect(() => {
    if (doctor) {
      form.setFieldsValue({
        doctorSchedule: doctor.doctorSchedule
          ? doctor.doctorSchedule.map((date: string) =>
              dayjs(date, "DD/MM/YYYY"),
            )
          : [],
        movingService: doctor.movingService,
      });
    }
  }, [doctor]);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoadingForm(true);
      const api = `/api/doctors/${doctorId}/schedule`;
      const data = {
        doctorSchedule: values.doctorSchedule.map((date: dayjs.Dayjs) =>
          date.format("DD/MM/YYYY"),
        ),
        movingService: values.movingService,
      };
      const res = await handleAPI(api, data, "PATCH");
      setDoctor(res.data);
      message.success("Cập nhật lịch làm việc thành công");
    } catch (error) {
      console.error(error);
      message.error("Không thể cập nhật lịch làm việc");
    } finally {
      setIsLoadingForm(false);
    }
  };

  if (isLoading) {
    return (
      <div className="section flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

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
                <Link to="/manager/doctor-calendar">
                  <div className="flex items-center gap-2">
                    <Cal size={20} />
                    Lịch làm việc của bác sĩ
                  </div>
                </Link>
              ),
            },
            {
              title: (
                <Link to="/manager/doctor-calendar">Chỉnh lịch làm việc</Link>
              ),
            },
            {
              title: `Bs. ${doctor?.doctorName}`,
            },
          ]}
        />
        <div className="flex h-[calc(100vh-120px)] flex-col justify-between">
          <Form
            disabled={isLoadingForm}
            form={form}
            onFinish={handleSubmit}
            size="large"
            layout="vertical"
          >
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
                      src={doctor?.photoUrl}
                      size={150}
                      icon={<User color="#ccc" size={50} />}
                    />
                    <p>
                      <span className="font-semibold">Họ và tên: </span>{" "}
                      {doctor?.doctorName}
                    </p>
                    <p>
                      <span className="font-semibold">Email: </span>{" "}
                      {doctor?.email}
                    </p>
                    <p>
                      <span className="font-semibold">Giới tính: </span>{" "}
                      <Tag color={getValue(doctor?.gender)}>
                        {doctor?.gender === "nam" ? "Nam" : "Nữ"}
                      </Tag>
                    </p>
                    <p>
                      <span className="font-semibold">
                        Ngày bắt đầu công việc:{" "}
                      </span>{" "}
                      {new Date(doctor?.startDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="">
                  <h4 className="heading-4">Chỉnh lịch</h4>
                  <Divider />
                  <div className="gap-2">
                    <Form.Item name="doctorSchedule" label="Ngày làm việc">
                      <DatePicker
                        disabledDate={(current) =>
                          current && current < dayjs().startOf("day")
                        }
                        allowClear={false}
                        placeholder="Chọn ngày"
                        maxTagCount="responsive"
                        format="DD/MM/YYYY"
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
                    <Form.Item name="movingService" label="Di chuyển">
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
              loading={isLoadingForm}
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
