import { Button, TableProps, Tabs, TabsProps, Tag } from "antd";
import { CustomTable } from "../../share";
import { getValue } from "../../utils";
import { HeaderPage } from "../../components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";

const Records = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const api = `/api/medicalRecords/customers`;
        const res = await handleAPI(api, undefined, "GET");

        setCustomers(res.data);
      } catch (error) {}
    };
    getCustomers();
  }, []);

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
      width: 220,
    },
    {
      key: "Giới tính",
      title: "Giới tính",
      dataIndex: "gender",
      width: 150,
      render: (text) => (
        <Tag color={getValue(text)}>{text === "nam" ? "Nam" : "Nữ"}</Tag>
      ),
    },
    {
      key: "Số điện thoại",
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      width: 150,
    },
    {
      key: "Số lần khám",
      title: "Số lần khám",
      dataIndex: "numberAppointment",
      width: 150,
    },
    {
      key: "Chi tiết",
      title: "Chi tiết",
      width: 150,
      render: (_text: any, record: any) => (
        <div className="text-center">
          <Link to={`/doctor/customers/${record._id}/fishes`}>
            <Button type="primary">Xem chi tiết</Button>
          </Link>
        </div>
      ),
    },
  ];

  const demoData = [
    {
      id: 1,
      fullName: "Đỗ Quang Dũng",
      gender: "nam",
      phoneNumber: "0352195876",
      numberAppointment: 5,
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Điều trị",
      children: (
        <div className="doctor-view">
          <CustomTable
            columns={columns}
            dataSource={customers}
            scroll="calc(100vh - 410px)"
            className="staff-table"
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "Kiểm định",
      children: (
        <div className="doctor-view">
          <CustomTable
            columns={columns}
            dataSource={demoData}
            scroll="calc(100vh - 410px)"
            className="staff-table"
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="section">
        <HeaderPage heading="Danh sách hồ sơ" placeholder="Tìm kiếm hồ sơ" />
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};

export default Records;
