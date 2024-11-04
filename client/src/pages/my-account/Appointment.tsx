import {
  Button,
  ConfigProvider,
  message,
  Modal,
  Rate,
  Spin,
  Table,
  TableProps,
  Tag,
  Input,
} from "antd";
import { getValue } from "../../utils";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";
import { useSelector } from "react-redux";
import { IAuth } from "../../types";
import { HeaderComponent } from "../../components";

const { TextArea } = Input;

const Appointment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState<any>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState<boolean>(false);
  const [currentAppointment, setCurrentAppointment] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  console.log(currentAppointment);

  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

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
        window.open(`https://pay.payos.vn/web/${res.data.paymentLinkId}`, "_blank");
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    }
  };

  const handleFeedbackSubmit = async () => {
    try {
      setFeedbackLoading(true);
      const api = `/api/feedbacks`;
      const feedbackData = {
        appointmentId: currentAppointment.appointmentId,
        rating,
        comment,
      };
      const res: any = await handleAPI(api, feedbackData, "POST");
      message.success(res.message);
      setIsFeedbackModalVisible(false);
    } catch (error: any) {
      console.log(error);
      message.error("Có lỗi xảy ra khi gửi đánh giá");
    } finally {
      setFeedbackLoading(false);
      setComment("");
      setRating(0);
    }
  };

  const showFeedbackModal = (record: any) => {
    setCurrentAppointment(record);
    setIsFeedbackModalVisible(true);
  };

  const columns: TableProps["columns"] = [
    {
      key: "#",
      title: "#",
      dataIndex: "key",
      width: 70,
      render: (_text, _record, index) => index + 1,
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
      width: 170,
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
      <div className="flex h-[calc(100vh-115px)] items-center justify-center">
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
          placeholder="Tìm cuộc hẹn"
        />
        {/* Table */}
        <div className="">
          <Table
            pagination={{
              showSizeChanger: true,
            }}
            columns={columns}
            dataSource={appointments}
            scroll={{
              y: "calc(100vh - 270px)",
            }}
          />
        </div>
      </div>

      <Modal
        okText="Gửi nhận xét"
        cancelText="Hủy"
        open={isFeedbackModalVisible}
        onOk={handleFeedbackSubmit}
        confirmLoading={feedbackLoading}
        onCancel={() => setIsFeedbackModalVisible(false)}
        okButtonProps={{ disabled: rating === 0 || comment.trim() === "" }}
      >
        <div className="my-5">
          <h1 className="heading-4">Viết đánh giá</h1>
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
          <div className="mt-3 text-center">
            <Rate
              onChange={setRating}
              value={rating}
              tooltips={["Rất tệ", "Tệ", "Ổn", "Tốt", "Rất tốt"]}
              style={{ fontSize: 28 }}
            />
          </div>
          <p className="mb-2 text-base font-semibold">Nhận xét</p>
          <TextArea
            size="large"
            placeholder="Hãy viết nhận xét của mình ở đây nhé"
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default Appointment;
