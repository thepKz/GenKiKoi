import { Breadcrumb, Button, TableProps, Tag } from "antd";
import { HeaderPage } from "../../components";
import { CustomTable } from "../../share";
import { Link } from "react-router-dom";
import { getValue } from "../../utils";
import { Calendar, CalendarSearch } from "iconsax-react";

const Appointments = () => {
  const columns: TableProps["columns"] = [
    {
      key: "#",
      title: "#",
      dataIndex: "key",
      render: (_text, _record, index) => index + 1,
      width: 60,
    },
    {
      key: "Dịch vụ",
      title: "Dịch vụ",
      dataIndex: "serviceName",
    },
    {
      key: "Bác sĩ",
      title: "Bác sĩ",
      dataIndex: "doctorFullName",
    },
    {
      key: "Ngày hẹn",
      title: "Ngày hẹn",
      dataIndex: "appointmentDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      key: "Trạng thái",
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => <Tag color={getValue(status)}>{status}</Tag>,
    },
    {
      key: "Notes",
      title: "Notes",
      dataIndex: "notes",
    },
    {
      key: "Chi tiết",
      title: "Chi tiết",
      render: (_text: any, _record: any) => (
        <div className="text-center">
          <Link to={"/staff/customers/348/appointments/485"}>
            <Button type="primary">Xem chi tiết</Button>
          </Link>
        </div>
      ),
    },
  ];

  const demoData = [
    {
      id: 1,
      serviceName: "Tiêm phòng",
      doctorFullName: "Đỗ Quang Dũng",
      notes: "",
      appointmentDate: "2024-10-16T15:18:26.465+00:00",
      status: "Đang chờ xử lý",
    },
  ];
  return (
    <div className="section">
      <HeaderPage heading="Danh sách cuộc hẹn" placeholder="Tìm cuộc hẹn" />
      <Breadcrumb
        separator=">"
        items={[
          {
            title: (
              <Link to="/staff/customers">
                <div className="flex items-center gap-2">
                  <CalendarSearch size={20} />
                  Cuộc hẹn khách hàng
                </div>
              </Link>
            ),
          },
          {
            title: (
              <Link to="/staff/customers/348/appointments">
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
        <CustomTable columns={columns} dataSource={demoData} />
      </div>
    </div>
  );
};

export default Appointments;
