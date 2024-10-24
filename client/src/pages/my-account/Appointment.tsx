import { Button, ConfigProvider, Modal, Spin, Table, TableProps, Tag } from "antd";
import { getValue } from "../../utils";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";
import { useSelector } from "react-redux";
import { IAuth } from "../../types";
import { HeaderComponent } from "../../components";

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
  {
    key: "action",
    title: "Hành động",
    width: 120,
    render: (_, record) => (
      <Button
        danger
        onClick={() =>
          Modal.warning({
            title: "Hủy lịch hẹn",
            content: "Thao tác này sẽ không thể hoàn tác!",
            okCancel: true,
            cancelText: "Hủy",
            okText: "Đồng ý",
            onOk: () => {
              console.log(record.appointmentId);
            },
          })
        }
      >
        Hủy lịch
      </Button>
    ),
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
      <div className="section appointment">
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
              y: "calc(100vh - 330px)",
            }}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Appointment;
