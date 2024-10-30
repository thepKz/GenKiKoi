import { message, Modal, Switch, TableProps, Tag } from "antd";
import { CustomTable } from "../../share";
import { getValue } from "../../utils";
import { HeaderPage } from "../../components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IAuth } from "../../types";
import { handleAPI } from "../../apis/handleAPI";
import { removeVietnameseTones } from "../../utils";

const Appointments = () => {
  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  const [appointments, setAppointments] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const api = `/api/appointments/doctors/${auth.adminId}`;

        const res = await handleAPI(api, undefined, "GET");

        setAppointments(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      }
    };
    getAppointments();
  }, [auth.adminId]);

  const handleCheck = (checked: boolean, appointmentId: string) => {
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
    });
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
      key: "Tên khách hàng",
      title: "Tên khách hàng",
      dataIndex: "customerName",
      width: 200,
    },
    {
      key: "Số điện thoại",
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      width: 120,
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
      width: 200,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      key: "Trạng thái",
      title: "Trạng thái",
      width: 150,
      dataIndex: "status",
      render: (status) => <Tag color={getValue(status)}>{status}</Tag>,
    },
    {
      key: "Xác nhận",
      title: "Xác nhận",
      width: 100,
      render: (_text: any, record: any) => (
        <div className="text-center">
          <Switch onChange={(checked) => handleCheck(checked, record.id)} />
        </div>
      ),
    },
  ];

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const filteredAppointments = appointments.filter((appointment: any) => {
    const searchValue = removeVietnameseTones(searchText.toLowerCase());
    const customerName = removeVietnameseTones(appointment.customerName.toLowerCase());
    const serviceName = removeVietnameseTones(appointment.serviceName.toLowerCase());
    
    return customerName.includes(searchValue) ||
           appointment.phoneNumber.includes(searchText) ||
           serviceName.includes(searchValue);
  });

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
          scroll="calc(100vh - 410px)"
          className="staff-table"
        />
      </div>
    </div>
  );
};

export default Appointments;
