import { message, Modal, Switch, TableProps, Tag } from "antd";
import { CustomTable } from "../../share";
import { getValue } from "../../utils";
import { HeaderPage } from "../../components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IAuth } from "../../types";
import { handleAPI } from "../../apis/handleAPI";

const Appointments = () => {
  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  const [appointments, setAppointments] = useState([]);

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
      onOk: () => {
        console.log(checked, appointmentId);
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

  return (
    <div>
      <div className="section">
        <HeaderPage
          heading="Danh sách cuộc hẹn"
          placeholder="Tìm kiếm cuộc hẹn"
        />
        <div className="doctor-view appointments">
          <CustomTable
            columns={columns}
            dataSource={appointments}
            scroll="calc(100vh - 410px)"
            className="staff-table"
          />
        </div>
      </div>
    </div>
  );
};

export default Appointments;
