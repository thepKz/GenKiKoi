import { Breadcrumb, Button, message, Spin, TableProps, Tag } from "antd";
import { HeaderPage } from "../../components";
import { CustomTable } from "../../share";
import { getValue } from "../../utils";
import { Link } from "react-router-dom";
import { CalendarSearch } from "iconsax-react";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";
import { removeVietnameseTones } from "../../utils";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getCustomers = async () => {
      try {
        setIsLoading(true);
        const api = `/api/customers/`;
        const res = await handleAPI(api, undefined, "GET");
        setCustomers(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message || "Lỗi khi lấy dữ liệu người dùng");
      } finally {
        setIsLoading(false);
      }
    };
    getCustomers();
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const filteredCustomers = customers.filter((customer: any) => {
    const searchValue = removeVietnameseTones(searchText.toLowerCase());
    const customerName = removeVietnameseTones(
      (customer.customerName || "").toLowerCase(),
    );
    const email = customer.email.toLowerCase();
    const phoneNumber = customer.phoneNumber || "";

    return (
      customerName.includes(searchValue) ||
      email.includes(searchText) ||
      phoneNumber.includes(searchText)
    );
  });

  const columns: TableProps["columns"] = [
    {
      key: "#",
      title: "#",
      dataIndex: "key",
      width: 30,
      render: (_text, _record, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
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
      filters: [
        { text: "Nam", value: "nam" },
        { text: "Nữ", value: "nữ" },
      ],
      onFilter: (value: any, record) => record.gender === value,
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

  if (isLoading) {
    return (
      <div className="section flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="section">
      <HeaderPage
        heading="Danh sách khách hàng"
        placeholder="Tìm khách hàng (Tên, email, số điện thoại)"
        alt="Tìm khách hàng (Tên, email, số điện thoại)"
        onSearch={handleSearch}
      />
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
        <CustomTable
          scroll="calc(100vh - 280px)"
          loading={isLoading}
          columns={columns}
          dataSource={filteredCustomers}
          onChange={(pagination) => setPagination(pagination)}
        />
      </div>
    </div>
  );
};

export default Customers;
