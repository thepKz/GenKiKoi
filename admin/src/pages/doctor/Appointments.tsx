import {
  Button,
  Divider,
  message,
  Modal,
  Spin,
  Switch,
  TableProps,
  Tag,
  Input,
} from "antd";
import { CustomTable } from "../../share";
import { getValue } from "../../utils";
import { HeaderPage } from "../../components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IAuth } from "../../types";
import { handleAPI } from "../../apis/handleAPI";
import { removeVietnameseTones } from "../../utils";
import GoogleMeetButton from "../../share/GoogleMeetButton";

const { TextArea } = Input;

const Appointments = () => {
  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [switchStates, setSwitchStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        setIsLoading(true);
        const api = `/api/appointments/doctors/${auth.adminId}`;

        const res = await handleAPI(api, undefined, "GET");

        setAppointments(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getAppointments();
  }, [auth.adminId]);

  const handleCheck = (checked: boolean, appointmentId: string) => {
    const currentState = switchStates[appointmentId] || false;

    Modal.confirm({
      title: `${checked ? "Xác nhận hoàn thành" : "Hoàn tác"}` + ` dịch vụ`,
      content: checked
        ? "Hãy đảm bảo khách hàng đã hoàn thành dịch vụ"
        : "Xác nhận đây không phải sự nhầm lẫn",
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const api = `/api/appointments/${appointmentId}/status`;
          const status = checked ? "DONE" : "";

          await handleAPI(api, { status }, "PATCH");

          // Refresh danh sách cuộc hẹn
          const appointmentsApi = `/api/appointments/doctors/${auth.adminId}`;
          const res = await handleAPI(appointmentsApi, undefined, "GET");
          setAppointments(res.data);

          message.success(
            `${checked ? "Hoàn thành" : "Hoàn tác"} dịch vụ thành công`,
          );
        } catch (error: any) {
          console.log(error);
          message.error(error.message || "Có lỗi xảy ra");
        }
      },
      onCancel: () => {
        setSwitchStates((prev) => ({ ...prev, [appointmentId]: currentState }));
      },
    });

    setSwitchStates((prev) => ({ ...prev, [appointmentId]: checked }));
  };

  const handleViewDetails = (appointment: any) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
  };

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
      key: "Tên khách hàng",
      title: "Tên khách hàng",
      dataIndex: "customerName",
      width: 200,
    },
    {
      key: "Số điện thoại",
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      width: 130,
    },
    {
      key: "Tên dịch vụ",
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      width: 170,
    },
    {
      key: "Ngày hẹn",
      title: "Ngày hẹn",
      dataIndex: "appointmentDate",
      width: 120,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      key: "Trạng thái",
      title: "Trạng thái",
      width: 120,
      dataIndex: "status",
      render: (status) => <Tag color={getValue(status)}>{status}</Tag>,
    },
    {
      key: "Hình thức khám",
      title: "Hình thức khám",
      width: 150,
      dataIndex: "typeOfConsulting",
      render: (status) => <Tag color={getValue(status)}>{status}</Tag>,
    },
    {
      key: "Chi tiết",
      title: "Xem chi tiết",
      render: (record) => (
        <Button onClick={() => handleViewDetails(record)}>Xem chi tiết</Button>
      ),
    },
    {
      key: "Xác nhận",
      title: "Xác nhận",
      width: 80,
      render: (_text: any, record: any) => (
        <div className="text-center">
          <Switch
            checked={switchStates[record.id] || false}
            onChange={(checked) => handleCheck(checked, record.id)}
          />
        </div>
      ),
    },
  ];

  console.log(appointments);

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const filteredAppointments = appointments.filter((appointment: any) => {
    const searchValue = removeVietnameseTones(searchText.toLowerCase());
    const customerName = removeVietnameseTones(
      appointment.customerName.toLowerCase(),
    );
    const serviceName = removeVietnameseTones(
      appointment.serviceName.toLowerCase(),
    );

    return (
      customerName.includes(searchValue) ||
      appointment.phoneNumber.includes(searchText) ||
      serviceName.includes(searchValue)
    );
  });

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
        placeholder="Tìm kiếm cuộc hẹn"
        onSearch={handleSearch}
      />
      <div className="doctor-view appointments">
        <CustomTable
          columns={columns}
          dataSource={filteredAppointments}
          className="staff-table"
          onChange={(pagination) => setPagination(pagination)}
        />
      </div>
      <Modal
        open={!!selectedAppointment}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedAppointment && (
          <div className="my-5 text-base">
            <h1 className="heading-4">Chi tiết cuộc hẹn</h1>
            <Divider />
            <div className="flex flex-col gap-2">
              <p>
                <strong>Tên khách hàng:</strong>{" "}
                {selectedAppointment.customerName}
              </p>
              <p className="flex items-center gap-2">
                <strong>Giới tính:</strong>
                {selectedAppointment.gender === "nam" ? (
                  <Tag color={getValue("nam")}>Nam</Tag>
                ) : (
                  <Tag color={getValue("nữ")}>Nữ</Tag>
                )}
              </p>
              <p>
                <strong>Số điện thoại:</strong>{" "}
                {selectedAppointment.phoneNumber}
              </p>
              {selectedAppointment.typeOfConsulting === "Tại nhà" && (
                <p>
                  <strong>Địa chỉ:</strong> {selectedAppointment.detailAddress}
                </p>
              )}
              <p>
                <strong>Tên dịch vụ:</strong> {selectedAppointment.serviceName}
              </p>
              <p className="flex items-center gap-2">
                <strong>Hình thức khám:</strong>{" "}
                <Tag color={getValue(selectedAppointment.typeOfConsulting)}>
                  {selectedAppointment.typeOfConsulting}
                </Tag>
              </p>
              <p>
                <strong>Ngày hẹn:</strong>{" "}
                {new Date(
                  selectedAppointment.appointmentDate,
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Giờ hẹn:</strong> {selectedAppointment.slotTime}
              </p>
              <p className="flex items-center gap-2">
                <strong>Trạng thái:</strong>
                <Tag color={getValue(selectedAppointment.status)}>
                  {selectedAppointment.status}
                </Tag>
              </p>
              {selectedAppointment.typeOfConsulting === "Tư vấn trực tuyến" && (
                <p className="flex items-center gap-2">
                  <strong>Google Meet:</strong>{" "}
                  <GoogleMeetButton to={selectedAppointment.googleMeetLink} />
                </p>
              )}
              <strong>Lý do khám:</strong>
              {selectedAppointment.reasons && (
                <TextArea value={selectedAppointment.reasons} readOnly />
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Appointments;
