import {
  Breadcrumb,
  Button,
  message,
  Modal,
  Spin,
  TableProps,
  Tag,
  Input,
  Form,
} from "antd";
import { HeaderPage } from "../../components";
import { CustomTable } from "../../share";
import { Link, useLocation } from "react-router-dom";
import { getValue } from "../../utils";
import { Calendar, CalendarSearch } from "iconsax-react";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";
import { removeVietnameseTones } from "../../utils";

const { TextArea } = Input;

const Appointments = () => {
  const { pathname } = useLocation();
  const customerId = pathname.split("/")[3];
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<any>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    const getAppointments = async () => {
      try {
        setIsLoading(true);
        const api = `/api/appointments/customers/${customerId}`;
        const res = await handleAPI(api, undefined, "GET");
        setAppointments(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(
          error.message || "Có lỗi xảy ra khi lấy danh sách cuộc hẹn",
        );
      } finally {
        setIsLoading(false);
      }
    };
    getAppointments();
  }, [customerId]);

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const handleCancelAppointment = async () => {
    try {
      setIsLoadingForm(true);
      const api = `/api/appointments/${selectedAppointment.appointmentId}/status`;
      await handleAPI(
        api,
        {
          status: "CANCELLED",
          notes: cancelReason,
        },
        "PATCH",
      );

      message.success("Hủy lịch hẹn thành công");
      setIsModalOpen(false);
      setCancelReason("");
      const updatedAppointments = appointments.map((app: any) => {
        if (app.appointmentId === selectedAppointment.appointmentId) {
          return { ...app, status: "Đã hủy" };
        }
        return app;
      });
      setAppointments(updatedAppointments);
    } catch (error: any) {
      console.log(error);
      message.error(error.message || "Có lỗi xảy ra khi hủy lịch hẹn");
    } finally {
      setIsLoadingForm(false);
    }
  };

  const filteredAppointments = appointments.filter((appointment: any) => {
    const searchValue = removeVietnameseTones(searchText.toLowerCase());
    const serviceName = removeVietnameseTones(
      appointment.serviceName.toLowerCase(),
    );
    const doctorName = removeVietnameseTones(
      appointment.doctorFullName.toLowerCase(),
    );

    return (
      serviceName.includes(searchValue) || doctorName.includes(searchValue)
    );
  });

  const columns: TableProps["columns"] = [
    {
      key: "#",
      title: "#",
      dataIndex: "key",
      render: (_text, _record, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
      width: 60,
    },
    {
      key: "Dịch vụ",
      title: "Dịch vụ",
      dataIndex: "serviceName",
      width: 200,
    },
    {
      key: "Bác sĩ",
      title: "Bác sĩ",
      dataIndex: "doctorFullName",
      width: 150,
    },
    {
      key: "Ngày hẹn",
      title: "Ngày hẹn",
      dataIndex: "appointmentDate",
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => {
        const dateA = new Date(a.appointmentDate);
        const dateB = new Date(b.appointmentDate);
        return dateA.getTime() - dateB.getTime();
      },
    },
    {
      key: "Trạng thái",
      title: "Trạng thái",
      dataIndex: "status",
      width: 150,
      render: (status) => <Tag color={getValue(status)}>{status}</Tag>,
      filters: [
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
      key: "Lý do khám",
      title: "Lý do khám",
      dataIndex: "reasons",
      width: 350,
    },
    {
      key: "Hủy lịch",
      title: "Hủy lịch",
      render: (_text: any, record: any) =>
        record.status === "Đã xác nhận" ? (
          <Button
            danger
            onClick={() => {
              setSelectedAppointment(record);
              setIsModalOpen(true);
            }}
          >
            Hủy lịch
          </Button>
        ) : (
          ""
        ),
    },
  ];

  if (isLoading) {
    return (
      <div className="section flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="section">
      <HeaderPage
        heading="Danh sách cuộc hẹn"
        alt="Tìm cuộc hẹn (Tên dịch vụ, bác sĩ)"
        placeholder="Tìm cuộc hẹn (Tên dịch vụ, bác sĩ)"
        onSearch={handleSearch}
      />
      <Breadcrumb
        separator=">"
        items={[
          {
            title: (
              <Link to="/manager/customers">
                <div className="flex items-center gap-2">
                  <CalendarSearch size={20} />
                  Cuộc hẹn khách hàng
                </div>
              </Link>
            ),
          },
          {
            title: (
              <Link to={`/manager/customers/${customerId}/appointments`}>
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  Danh sách cuộc hẹn
                </div>
              </Link>
            ),
          },
        ]}
      />
      <div className="mt-2">
        <CustomTable
          scroll="calc(100vh - 280px)"
          columns={columns}
          dataSource={filteredAppointments}
          onChange={(pagination) => setPagination(pagination)}
        />
      </div>
      <Modal
        confirmLoading={isLoadingForm}
        open={isModalOpen}
        okText="Xác nhận"
        onOk={() => form.submit()}
        cancelText="Hủy"
        onCancel={() => {
          setIsModalOpen(false);
          setCancelReason("");
        }}
      >
        <div className="my-3">
          <h4 className="heading-4">Xác nhận hủy lịch hẹn</h4>
          <p className="my-2 text-base">
            Bạn có chắc chắn muốn hủy lịch hẹn này?
          </p>
          <Form
            size="large"
            layout="vertical"
            form={form}
            onFinish={handleCancelAppointment}
          >
            <Form.Item
              name="cancelReason"
              label="Lý do hủy"
              rules={[{ required: true, message: "Vui lòng nhập lý do hủy" }]}
            >
              <TextArea
                size="large"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Lý do hủy cuộc hẹn"
                rows={6}
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Appointments;
