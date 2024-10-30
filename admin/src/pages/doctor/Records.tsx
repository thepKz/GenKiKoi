import { Button, TableProps, Tabs, TabsProps, Tag } from "antd";
import { CustomTable } from "../../share";
import { getValue, removeVietnameseTones } from "../../utils";
import { HeaderPage } from "../../components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";

const Records = () => {
  const [medicalCustomers, setMedicalCustomers] = useState([]);
  const [pondCustomers, setPondCustomers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const filteredMedicalCustomers = medicalCustomers.filter(
    (medicalCustomer: any) => {
      const searchValue = removeVietnameseTones(searchText.toLowerCase());
      const customerName = removeVietnameseTones(
        medicalCustomer.customerName.toLowerCase(),
      );

      return (
        customerName.includes(searchValue) ||
        medicalCustomer.phoneNumber.includes(searchText)
      );
    },
  );

  const filteredPondCustomers = pondCustomers.filter((pondCustomer: any) => {
    const searchValue = removeVietnameseTones(searchText.toLowerCase());
    const customerName = removeVietnameseTones(
      pondCustomer.customerName.toLowerCase(),
    );

    return (
      customerName.includes(searchValue) ||
      pondCustomer.phoneNumber.includes(searchText)
    );
  });

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const api = `/api/medicalRecords/customers`;
        const res = await handleAPI(api, undefined, "GET");

        setMedicalCustomers(res.data);
      } catch (error) {}
    };
    getCustomers();
  }, []);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const api = `/api/ponds/customers`;
        const res = await handleAPI(api, undefined, "GET");

        setPondCustomers(res.data);
      } catch (error) {}
    };
    getCustomers();
  }, []);

  const medicalColumn: TableProps["columns"] = [
    {
      key: "#",
      title: "#",
      dataIndex: "key",
      width: 70,
      render: (_text, _record, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
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

  const pondColumn: TableProps["columns"] = [
    {
      key: "#",
      title: "#",
      dataIndex: "key",
      width: 70,
      render: (_text, _record, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
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
      key: "Số lần kiểm định",
      title: "Số lần kiểm định",
      dataIndex: "numberPond",
      width: 150,
    },
    {
      key: "Chi tiết",
      title: "Chi tiết",
      width: 150,
      render: (_text: any, record: any) => (
        <div className="text-center">
          <Link to={`/doctor/customers/${record._id}/ponds`}>
            <Button type="primary">Xem chi tiết</Button>
          </Link>
        </div>
      ),
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Điều trị",
      children: (
        <div className="doctor-view">
          <CustomTable
            columns={medicalColumn}
            dataSource={filteredMedicalCustomers}
            scroll="calc(100vh - 320px)"
            className="staff-table"
            onChange={(pagination) => setPagination(pagination)}
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
            columns={pondColumn}
            dataSource={filteredPondCustomers}
            scroll="calc(100vh - 320px)"
            className="staff-table"
            onChange={(pagination) => setPagination(pagination)}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="section">
        <HeaderPage
          heading="Danh sách hồ sơ"
          placeholder="Tìm kiếm hồ sơ"
          onSearch={handleSearch}
        />
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};

export default Records;
