import { Breadcrumb, Button, message, TableProps, Tag } from "antd";
import { HeaderPage } from "../../components";
import { CustomTable } from "../../share";
import { getValue } from "../../utils";
import { Link } from "react-router-dom";
import { CalendarSearch } from "iconsax-react";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        setIsLoading(true);
        const api = `/api/customers/`;
        const res = await handleAPI(api, undefined, "GET");
        setCustomers(res.data);
      } catch (error) {
        message.error("Lỗi khi lấy dữ liệu người dùng");
      } finally {
        setIsLoading(true);
      }
    };
    getCustomers();
  }, []);

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
      dataIndex: "customerName",
      width: 120,
      render: (name) => (name === "" ? <Tag>NULL</Tag> : name),
    },
    {
      key: "Giới tính",
      title: "Giới tính",
      dataIndex: "gender",
      width: 60,
      render: (text) => (
        <Tag color={getValue(text)}>
          {text === "nam" ? "Nam" : text === "" ? "NULL" : "Nữ"}
        </Tag>
      ),
    },
    {
      key: "Số điện thoại",
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      width: 100,
      render: (phone) => (phone === "" ? <Tag>NULL</Tag> : phone),
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
          <Link to={`/staff/customers/${record.id}/appointments`}>
            <Button type="primary">Xem chi tiết</Button>
          </Link>
        </div>
      ),
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
        <CustomTable columns={columns} dataSource={customers} />
      </div>
    </div>
  );
};

export default Customers;
