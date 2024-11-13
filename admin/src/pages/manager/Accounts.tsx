import { Button, message, TableProps, Tag, Modal, Spin } from "antd";
import { HeaderPage } from "../../components";
import { CustomTable } from "../../share";
import { getValue } from "../../utils";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";
import { removeVietnameseTones } from "../../utils";

const Accounts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<any>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getAccounts = async () => {
      try {
        setIsLoading(true);
        const api = `/api/users/all`;
        const res = await handleAPI(api, undefined, "GET");
        setAccounts(res.data);
      } catch (error: any) {
        console.error(error);
        message.error(
          error.message || "Có lỗi xảy ra khi lấy danh sách tài khoản",
        );
      } finally {
        setIsLoading(false);
      }
    };
    getAccounts();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    Modal.confirm({
      title: "Xác nhận",
      content: `Bạn có chắc chắn muốn ${
        currentStatus ? "kích hoạt" : "vô hiệu hóa"
      } tài khoản này?`,
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          setIsLoading(true);
          const api = `/api/users/toggle-status/${id}`;
          await handleAPI(api, undefined, "PATCH");

          const updatedAccounts = accounts.map((account: any) =>
            account.id === id
              ? { ...account, isDisabled: !account.isDisabled }
              : account,
          );

          setAccounts(updatedAccounts);
          message.success("Cập nhật thành công");
        } catch (error: any) {
          console.error(error);
          message.error(
            error.message || "Có lỗi xảy ra khi cập nhật trạng thái tài khoản",
          );
        } finally {
          setIsLoading(false);
        }
      },
    });
  };

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const filteredAccounts = accounts.filter((account: any) => {
    const searchValue = removeVietnameseTones(searchText.toLowerCase());
    const username = removeVietnameseTones(account.username.toLowerCase());
    const email = account.email.toLowerCase();
    const fullName = removeVietnameseTones(
      (account.fullName || "").toLowerCase(),
    );
    const phoneNumber = account.phoneNumber || "";

    return (
      username.includes(searchValue) ||
      email.includes(searchText) ||
      fullName.includes(searchValue) ||
      phoneNumber.includes(searchText)
    );
  });

  const columns: TableProps["columns"] = [
    {
      key: "#",
      title: "#",
      dataIndex: "key",
      render: (_text, _record, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
      width: 60,
    },
    {
      key: "username",
      title: "Tên tài khoản",
      dataIndex: "username",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "fullName",
      title: "Họ và tên",
      dataIndex: "fullName",
      width: 170,
      render: (text) => (text === "" ? <Tag>NULL</Tag> : text),
    },
    {
      key: "phoneNumber",
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      width: 120,
      render: (text) => (text === "" ? <Tag>NULL</Tag> : text),
    },
    {
      key: "role",
      title: "Vai trò",
      dataIndex: "role",
      width: 120,
      render: (role) => <Tag color={getValue(role)}>{role}</Tag>,
      filters: [
        { text: "Quản lý", value: "manager" },
        { text: "Bác sĩ", value: "doctor" },
        { text: "Nhân viên", value: "staff" },
        { text: "Khách hàng", value: "customer" },
      ],
      onFilter: (value: any, record) => record.role === value,
    },
    {
      key: "isDisabled",
      title: "Trạng thái",
      dataIndex: "isDisabled",
      width: 120,
      render: (status: boolean) => (
        <Tag color={getValue(status ? "no" : "yes")}>
          {status ? "Đã khóa" : "Hoạt động"}
        </Tag>
      ),
      filters: [
        { text: "Hoạt động", value: false },
        { text: "Đã khóa", value: true },
      ],
      onFilter: (value: any, record) => record.isDisabled === value,
    },
    {
      key: "action",
      title: "",
      dataIndex: "",
      width: 150,
      render: (_text: any, record: any) => (
        <Button
          type={record.isDisabled ? "primary" : "default"}
          danger={!record.isDisabled}
          onClick={() => handleToggleStatus(record.id, record.isDisabled)}
        >
          {record.isDisabled ? "Kích hoạt" : "Vô hiệu hóa"}
        </Button>
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
    <div className="section accounts">
      <HeaderPage
        heading="Danh sách tài khoản"
        placeholder="Tìm tài khoản (Tên tài khoản, email, họ và tên, số điện thoại)"
        alt="Tìm tài khoản (Tên tài khoản, email, họ và tên, số điện thoại)"
        onSearch={handleSearch}
      />
      <div className="mt-2">
        <CustomTable
          scroll="calc(100vh - 260px)"
          columns={columns}
          dataSource={filteredAccounts}
          onChange={(pagination) => setPagination(pagination)}
        />
      </div>
    </div>
  );
};

export default Accounts;
