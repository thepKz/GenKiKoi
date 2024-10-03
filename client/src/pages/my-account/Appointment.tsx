import { Button, ConfigProvider, Divider, Table, TableProps, Tag } from "antd";
import { Sort } from "iconsax-react";
import { AppointmentData } from "../../models/DataModels";
import { getValue } from "../../utils";

const data: AppointmentData[] = [
  {
    key: 1,
    serviceType: "Kiểm tra chất lượng nước",
    date: "30-09-2024",
    veterinarianName: "Bs. Đỗ Quang Dũng",
    appointmentStatus: "Đang chờ xác nhận",
    appointmentNotes: "Việc thăm khám sẽ khoảng 1h!",
  },
  {
    key: 2,
    serviceType: "Chuẩn đoán & Điều trị",
    date: "20-09-2024",
    veterinarianName: "Bs. Mai Tấn Thép",
    appointmentStatus: "Đã hoàn thành",
    appointmentNotes: "",
  },
  {
    key: 3,
    serviceType: "Tiêm vaccine",
    date: "26-09-2024",
    veterinarianName: "Bs. Nguyễn Văn A",
    appointmentStatus: "Đã thay đổi lịch",
    appointmentNotes: "Cơ sở đang tiến hành sửa chữa, mong quý khánh thông cảm!",
  },
  {
    key: 4,
    serviceType: "Kiểm tra chất lượng nước",
    date: "15-09-2024",
    veterinarianName: "Bs. Đỗ Quang Dũng",
    appointmentStatus: "Đã hủy",
    appointmentNotes:
      "Quý khánh sẽ được hoàn tiền theo chính sách đã thông báo trước đó. Trân trọng!",
  },
  {
    key: 5,
    serviceType: "Chuẩn đoán & Điều trị",
    date: "29-09-2024",
    veterinarianName: "Bs. Nguyễn Văn C",
    appointmentStatus: "Đã lên lịch",
    appointmentNotes: "Quý khánh vui lòng đến trước giờ hẹn 15 phút!",
  },
  {
    key: 6,
    serviceType: "Tiêm vaccine",
    date: "15-09-2024",
    veterinarianName: "Bs. Đỗ Quang Dũng",
    appointmentStatus: "Đã hoàn thành",
    appointmentNotes: "",
  },
  {
    key: 7,
    serviceType: "Kiểm tra chất lượng nước",
    date: "27-09-2024",
    veterinarianName: "Bs. Nguyễn Văn D",
    appointmentStatus: "Đã lên lịch",
    appointmentNotes: "Việc thăm khám sẽ khoảng 1h!",
  },
  {
    key: 8,
    serviceType: "Chuẩn đoán & Điều trị",
    date: "28-09-2024",
    veterinarianName: "Bs. Đỗ Quang Dũng",
    appointmentStatus: "Đang chờ xác nhận",
    appointmentNotes: "Việc thăm khám sẽ khoảng 1h!",
  },
  {
    key: 9,
    serviceType: "Kiểm tra chất lượng nước",
    date: "30-09-2024",
    veterinarianName: "Bs. Đỗ Quang Dũng",
    appointmentStatus: "Đang chờ xác nhận",
    appointmentNotes: "Việc thăm khám sẽ khoảng 1h!",
  },
  {
    key: 10,
    serviceType: "Chuẩn đoán & Điều trị",
    date: "20-09-2024",
    veterinarianName: "Bs. Mai Tấn Thép",
    appointmentStatus: "Đã hoàn thành",
    appointmentNotes: "",
  },
  {
    key: 11,
    serviceType: "Tiêm vaccine",
    date: "26-09-2024",
    veterinarianName: "Bs. Nguyễn Văn A",
    appointmentStatus: "Đã thay đổi lịch",
    appointmentNotes: "Cơ sở đang tiến hành sửa chữa, mong quý khánh thông cảm!",
  },
  {
    key: 12,
    serviceType: "Kiểm tra chất lượng nước",
    date: "15-09-2024",
    veterinarianName: "Bs. Đỗ Quang Dũng",
    appointmentStatus: "Đã hủy",
    appointmentNotes:
      "Quý khánh sẽ được hoàn tiền theo chính sách đã thông báo trước đó. Trân trọng!",
  },
  {
    key: 13,
    serviceType: "Chuẩn đoán & Điều trị",
    date: "29-09-2024",
    veterinarianName: "Bs. Nguyễn Văn C",
    appointmentStatus: "Đã lên lịch",
    appointmentNotes: "Quý khánh vui lòng đến trước giờ hẹn 15 phút!",
  },
  {
    key: 14,
    serviceType: "Tiêm vaccine",
    date: "15-09-2024",
    veterinarianName: "Bs. Đỗ Quang Dũng",
    appointmentStatus: "Đã hoàn thành",
    appointmentNotes: "",
  },
  {
    key: 15,
    serviceType: "Kiểm tra chất lượng nước",
    date: "27-09-2024",
    veterinarianName: "Bs. Nguyễn Văn D",
    appointmentStatus: "Đã lên lịch",
    appointmentNotes: "Việc thăm khám sẽ khoảng 1h!",
  },
  {
    key: 16,
    serviceType: "Chuẩn đoán & Điều trị",
    date: "28-09-2024",
    veterinarianName: "Bs. Đỗ Quang Dũng",
    appointmentStatus: "Đang chờ xác nhận",
    appointmentNotes: "Việc thăm khám sẽ khoảng 1h!",
  },
];

const columns: TableProps<AppointmentData>["columns"] = [
  {
    key: "#",
    title: "#",
    dataIndex: "key",
    width: 70,
  },
  {
    key: "Dịch vụ",
    title: "Dịch vụ",
    dataIndex: "serviceType",
    width: 200,
  },
  {
    key: "Ngày hẹn",
    title: "Ngày hẹn",
    dataIndex: "date",
    width: 120,
  },
  {
    key: "Bác sĩ",
    title: "Bác sĩ",
    dataIndex: "veterinarianName",
    width: 180,
  },
  {
    key: "Trạng thái cuộc hẹn",
    title: "Trạng thái cuộc hẹn",
    dataIndex: "appointmentStatus",
    width: 170,
    render: (_, { appointmentStatus }) => (
      <>
        <Tag
          color={getValue(appointmentStatus)}
          key={appointmentStatus}
        >
          {appointmentStatus}
        </Tag>
      </>
    ),
  },
  {
    key: "Ghi chú",
    title: "Ghi chú của trung tâm",
    dataIndex: "appointmentNotes",
  },
];

const Appointment = () => {
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
              <Button icon={<Sort size={18} />}>Lọc</Button>
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
            dataSource={data}
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
