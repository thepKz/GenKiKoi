import { Modal, Switch, TableProps, Tabs, TabsProps, Tag } from "antd";
import { CustomTable } from "../../share";
import { getValue } from "../../utils";
import { HeaderPage } from "../../components";

const Appointments = () => {
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
      dataIndex: "fullName",
      width: 200,
    },
    {
      key: "Giới tính",
      title: "Giới tính",
      dataIndex: "gender",
      width: 100,
      render: (text) => (
        <Tag color={getValue(text)}>{text === "nam" ? "Nam" : "Nữ"}</Tag>
      ),
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
      key: "Ghi chú",
      title: "Ghi chú",
      dataIndex: "notes",
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

  const demoData = [
    {
      id: 1,
      fullName: "Đỗ Quang Dũng",
      gender: "nam",
      serviceName: "Siêu âm",
      phoneNumber: "0352195876",
      notes: "Tái khám",
      status: "Đang chờ xử lý",
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
            dataSource={demoData}
            scroll="calc(100vh - 410px)"
            className="staff-table"
          />
        </div>
      </div>
    </div>
  );
};

export default Appointments;
