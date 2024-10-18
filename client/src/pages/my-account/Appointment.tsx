import {
  Button,
  ConfigProvider,
  Divider,
  Dropdown,
  MenuProps,
  message,
  Spin,
  Table,
  TableProps,
  Tag,
} from "antd";
import { CalendarCircle, Sort } from "iconsax-react";
import { AppointmentData } from "../../models/DataModels";
import { getValue } from "../../utils";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";
import { useSelector } from "react-redux";
import { IAuth } from "../../types";

const columns: TableProps<AppointmentData>["columns"] = [
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
    width: 250,
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
];

const Appointment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        setIsLoading(true);
        const api = `/api/appointments/${auth.customerId}`;
        const res: any = await handleAPI(api, undefined, "GET");
        setAppointments(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getAppointments();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-115px)] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  const handleSortAppointments = () => {
    const today = new Date().getTime();
    const sortedAppointments = [...appointments].sort((a: any, b: any) => {
      const dateA = new Date(a.appointmentDate).getTime();
      const dateB = new Date(b.appointmentDate).getTime();

      // Tính khoảng cách từ ngày hiện tại đến ngày hẹn
      const diffA = Math.abs(dateA - today);
      const diffB = Math.abs(dateB - today);

      // Các cuộc hẹn đã qua sẽ được xếp ở cuối bảng
      if (dateA < today && dateB >= today) return 1;
      if (dateB < today && dateA >= today) return -1;

      // Sắp xếp theo khoảng cách từ gần đến xa
      return diffA - diffB;
    });
    setAppointments(sortedAppointments);
  };

  const filterOptions: MenuProps["items"] = [
    {
      key: "1",
      label: "Ngày gần đến hẹn",
      icon: <CalendarCircle size={20} />,
      onClick: () => handleSortAppointments(),
    },
  ];

  return (
    <div>
      <div className="container mx-auto my-5 h-[calc(100vh-115px)] rounded-md bg-white p-5 shadow-sm lg:w-[95%]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="heading-3">Danh sách cuộc hẹn</h1>
          <div className="">
            <ConfigProvider
              theme={{
                inherit: false,
                token: {
                  fontFamily: "Pro-Rounded",
                },
              }}
            >
              <Dropdown menu={{ items: filterOptions }}>
                <Button icon={<Sort size={18} />}>Lọc</Button>
              </Dropdown>
            </ConfigProvider>
          </div>
        </div>
        {/* Divider */}
        <ConfigProvider
          theme={{
            components: {
              Divider: {
                marginLG: 15,
              },
            },
          }}
        >
          <Divider />
        </ConfigProvider>
        {/* Table */}
        <div className="">
          <Table
            pagination={{
              showSizeChanger: true,
            }}
            columns={columns}
            dataSource={appointments}
            scroll={{
              y: "calc(100vh - 330px)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Appointment;
