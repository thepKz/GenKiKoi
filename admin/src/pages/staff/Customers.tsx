import { Breadcrumb, Button, TableProps, Tag } from "antd";
import { HeaderPage } from "../../components";
import { CustomTable } from "../../share";
import { getValue } from "../../utils";
import { Link } from "react-router-dom";
import { CalendarSearch } from "iconsax-react";

const Customers = () => {
  const columns: TableProps["columns"] = [
    {
      key: "#",
      title: "#",
      dataIndex: "key",
      width: 30,
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "Tên khách hàng",
      title: "Tên khách hàng",
      dataIndex: "fullName",
      width: 120,
    },
    {
      key: "Giới tính",
      title: "Giới tính",
      dataIndex: "gender",
      width: 60,
      render: (text) => (
        <Tag color={getValue(text)}>{text === "nam" ? "Nam" : "Nữ"}</Tag>
      ),
    },
    {
      key: "Số điện thoại",
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      width: 100,
    },
    {
      key: "Email",
      title: "Email",
      dataIndex: "email",
      width: 150,
    },
    {
      key: "Chi tiết",
      title: "Chi tiết",
      width: 80,
      render: (_text: any, record: any) => (
        <div className="text-center">
          <Link to={"/staff/customers/348/appointments"}>
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
      email: "doquangdung1782004@gmail.com",
    },
  ];

  return (
    <div className="section">
      <HeaderPage heading="Danh sách khách hàng" placeholder="Tìm khách hàng" />
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
        ]}
      />
      <div className="mt-2">
        <CustomTable columns={columns} dataSource={demoData} />
      </div>
    </div>
  );
};

export default Customers;
