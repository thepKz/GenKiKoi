import { Button, message, TableProps, Tag, Modal } from "antd";
import { HeaderPage } from "../../components";
import { CustomTable } from "../../share";
import { getValue } from "../../utils";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";

const Accounts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<any>([]);

  useEffect(() => {
    const getAccounts = async () => {
      try {
        setIsLoading(true);
        const api = `/api/users/all`;
        const res = await handleAPI(api, undefined, "GET");
        setAccounts(res.data);
      } catch (error) {
        console.error(error);
        message.error("Có lỗi xảy ra khi lấy danh sách tài khoản");
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
        } catch (error) {
          console.error(error);
          message.error("Có lỗi xảy ra khi cập nhật trạng thái tài khoản");
        } finally {
          setIsLoading(false);
        }
      },
    });
  };

  const columns: TableProps["columns"] = [
    {
      key: "#",
      title: "#",
      dataIndex: "key",
      render: (_text, _record, index) => index + 1,
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
  return (
    <div className="section accounts">
      <HeaderPage heading="Danh sách tài khoản" placeholder="Tìm tài khoản" />
      <div className="mt-2">
        <CustomTable
          scroll="calc(100vh - 260px)"
          loading={isLoading}
          columns={columns}
          dataSource={accounts}
        />
      </div>
    </div>
  );
};

export default Accounts;
