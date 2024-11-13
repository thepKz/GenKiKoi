import {
  Button,
  ConfigProvider,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Rate,
  Spin,
  Table,
  TableProps,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleAPI } from "../../apis/handleAPI";
import { HeaderComponent } from "../../components";
import { IAuth } from "../../types";
import { getValue, removeVietnameseTones } from "../../utils";

const { TextArea } = Input;

const Appointment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState<any>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState<boolean>(false);
  const [currentAppointment, setCurrentAppointment] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  const [form] = Form.useForm();

  useEffect(() => {
    const getAppointments = async () => {
      try {
        setIsLoading(true);
        const api = `/api/appointments/customers/${auth.customerId}`;
        const res: any = await handleAPI(api, undefined, "GET");
        setAppointments(res.data);
      } catch (error: any) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getAppointments();
  }, []);

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      const api = `/api/appointments/${appointmentId}/status`;
      const res: any = await handleAPI(api, { status: "CANCELLED" }, "PATCH");
      if (res.message === "Đã cập nhật cuộc hẹn") {
        setAppointments((prevAppointments: any) =>
          prevAppointments.map((appointment: any) =>
            appointment.appointmentId === appointmentId
              ? {
                  ...appointment,
                  status: "Đã hủy",
                  notes: "Quý khách sẽ được hoàn tiền theo chính sách của công ty!",
                }
              : appointment,
          ),
        );
      }
      message.success(res.message);
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    }
  };

  const handlePayment = async (appointmentId: string) => {
    try {
      const api = `/api/payments/appointments/${appointmentId}`;

      const res = await handleAPI(api, undefined, "GET");

      if (res.data) {
        window.open(`https://pay.payos.vn/web/${res.data.paymentLinkId}`, "_self");
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    }
  };

  const handleFeedbackSubmit = async (values: any) => {
    try {
      setFeedbackLoading(true);
      const api = `/api/feedbacks`;
      const feedbackData = {
        appointmentId: currentAppointment.appointmentId,
        rating: values.rating,
        comment: values.comment,
      };
      const res: any = await handleAPI(api, feedbackData, "POST");

      setAppointments((prevAppointments: any) =>
        prevAppointments.map((appointment: any) =>
          appointment.appointmentId === currentAppointment.appointmentId
            ? { ...appointment, isFeedback: true }
            : appointment,
        ),
      );

      message.success(res.message);
      setIsFeedbackModalVisible(false);
    } catch (error: any) {
      console.log(error);
      message.error(error.message || "Có lỗi xảy ra khi gửi đánh giá");
    } finally {
      setFeedbackLoading(false);
      form.resetFields();
    }
  };

  const showFeedbackModal = (record: any) => {
    setCurrentAppointment(record);
    setIsFeedbackModalVisible(true);
    form.resetFields();
  };

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const filteredAppointments = appointments.filter((appointment: any) => {
    const searchValue = removeVietnameseTones(searchText.toLowerCase());
    const serviceName = removeVietnameseTones(appointment.serviceName.toLowerCase());
    const doctorName = removeVietnameseTones(appointment.doctorFullName.toLowerCase());

    return serviceName.includes(searchValue) || doctorName.includes(searchValue);
  });

  const columns: TableProps["columns"] = [
    {
      key: "#",
      title: "#",
      dataIndex: "key",
      width: 70,
      render: (_text, _record, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      key: "Tên dịch vụ",
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      width: 200,
    },
    {
      key: "Ngày hẹn",
      title: "Ngày hẹn",
      dataIndex: "appointmentDate",
      width: 120,
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => {
        const dateA = new Date(a.appointmentDate);
        const dateB = new Date(b.appointmentDate);
        return dateA.getTime() - dateB.getTime();
      },
    },
    {
      key: "Bác sĩ",
      title: "Bác sĩ",
      dataIndex: "doctorFullName",
      width: 200,
      render: (name) => "BS. " + name,
    },
    {
      key: "Trạng thái cuộc hẹn",
      title: "Trạng thái cuộc hẹn",
      dataIndex: "status",
      width: 180,
      render: (status) => (
        <>
          <Tag
            color={getValue(status)}
            key={status}
          >
            {status}
          </Tag>
        </>
      ),
      filters: [
        {
          text: "Đang chờ xử lý",
          value: "Đang chờ xử lý",
        },
        {
          text: "Đã xác nhận",
          value: "Đã xác nhận",
        },
        {
          text: "Đã hoàn thành",
          value: "Đã hoàn thành",
        },
        {
          text: "Đã hủy",
          value: "Đã hủy",
        },
      ],
      onFilter: (value: any, record) => record.status === value,
    },
    {
      key: "Ghi chú",
      title: "Ghi chú của trung tâm",
      dataIndex: "notes",
    },
    {
      key: "action",
      title: "Hành động",
      width: 150,
      render: (_, record) => {
        return record.status === "Đã xác nhận" ? (
          <Button
            danger
            onClick={() =>
              Modal.warning({
                title: "Hủy lịch hẹn",
                content: "Thao tác này sẽ không thể hoàn tác!",
                okCancel: true,
                cancelText: "Hủy",
                okText: "Đồng ý",
                onOk: () => handleCancelAppointment(record.appointmentId),
              })
            }
          >
            Hủy lịch
          </Button>
        ) : record.status === "Đang chờ xử lý" ? (
          <Button
            type="primary"
            onClick={() => handlePayment(record.appointmentId)}
          >
            Thanh toán
          </Button>
        ) : record.status === "Đã hoàn thành" && !record.isFeedback ? (
          <Button
            type="primary"
            onClick={() => showFeedbackModal(record)}
          >
            Viết đánh giá
          </Button>
        ) : (
          ""
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="my-account-section flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        inherit: false,
        token: {
          fontFamily: "Pro-Rounded",
        },
      }}
    >
      <div className="my-account-section appointment">
        {/* Header */}
        <HeaderComponent
          heading="Danh sách cuộc hẹn"
          alt="Tìm cuộc hẹn (Tên dịch vụ, bác sĩ)"
          placeholder="Tìm cuộc hẹn (Tên dịch vụ, bác sĩ)"
          onSearch={handleSearch}
        />
        {/* Table */}
        <div className="">
          <Table
            pagination={{
              showSizeChanger: true,
            }}
            columns={columns}
            dataSource={filteredAppointments}
            scroll={{
              y: "calc(100vh - 270px)",
            }}
            onChange={(pagination: any) => setPagination(pagination)}
          />
        </div>
      </div>

      <Modal
        okText="Gửi nhận xét"
        cancelText="Hủy"
        open={isFeedbackModalVisible}
        onOk={() => form.submit()}
        confirmLoading={feedbackLoading}
        onCancel={() => {
          setIsFeedbackModalVisible(false);
          form.resetFields();
        }}
      >
        <div className="feedback py-5 pb-0">
          <h1 className="heading-4">Viết đánh giá</h1>
          <Divider style={{ margin: "10px 0" }} />
          <div className="my-2 flex flex-col gap-3 text-base">
            <p>
              <span className="font-semibold">Đánh giá dịch vụ:</span>{" "}
              {currentAppointment?.serviceName}
            </p>
            <p>
              <span className="font-semibold">Bác sĩ:</span> {currentAppointment?.doctorFullName}
            </p>
            <p className="font-semibold">Bạn có hài lòng với cuộc hẹn này không 🥰</p>
          </div>

          <Form
            form={form}
            onFinish={handleFeedbackSubmit}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Vui lòng đánh giá số sao",
                },
              ]}
              className="mb-0 flex justify-center"
            >
              <Rate
                tooltips={["Rất tệ", "Tệ", "Ổn", "Tốt", "Rất tốt"]}
                style={{ fontSize: 28 }}
                className=""
              />
            </Form.Item>

            <Form.Item
              name="comment"
              label="Nhận xét"
              validateTrigger="onBlur"
              rules={[
                {
                  min: 10,
                  message: "Nhận xét phải có ít nhất 10 ký tự",
                },
                {
                  max: 500,
                  message: "Nhận xét không được vượt quá 500 ký tự",
                },
                {
                  required: true,
                  message: "Vui lòng viết nhận xét của bạn",
                }
              ]}

            >
              <TextArea
                size="large"
                placeholder="Hãy viết nhận xét của mình ở đây nhé"
                rows={5}
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default Appointment;
