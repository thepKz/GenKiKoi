import { Breadcrumb, Button, message, TableProps, Tag } from "antd";
import { HeaderPage } from "../../components";
import { CustomTable } from "../../share";
import { Link, useLocation } from "react-router-dom";
import { getValue } from "../../utils";
import { Calendar, CalendarSearch } from "iconsax-react";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";

const Appointments = () => {
  const { pathname } = useLocation();
  const customerId = pathname.split("/")[3];
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        setIsLoading(true);
        const api = `/api/appointments/customers/${customerId}`;
        const res = await handleAPI(api, undefined, "GET");
        setAppointments(res.data);
      } catch (error) {
        message.error("Có lỗi xảy ra khi lấy danh sách cuộc hẹn");
      } finally {
        setIsLoading(false);
      }
    };
    getAppointments();
  }, [customerId]);

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
      width: 150,
      render: (status) => <Tag color={getValue(status)}>{status}</Tag>,
    },
    {
      key: "Lý do khám",
      title: "Lý do khám",
      dataIndex: "reasons",
      width: 400,
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
              <Link to={`/staff/customers/${customerId}/appointments`}>
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
          loading={isLoading}
          columns={columns}
          dataSource={appointments}
        />
      </div>
    </div>
  );
};

export default Appointments;
