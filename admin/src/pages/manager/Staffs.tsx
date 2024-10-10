import {
  Button,
  Divider,
  message,
  TableProps,
  Tabs,
  TabsProps,
  Tag,
} from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { CustomTable } from "../../share";
import { useEffect, useState } from "react";
import { getValue } from "../../utils";
import { handleAPI } from "../../apis/handleAPI";

const Staffs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getAllStaffs = async () => {
      try {
        setIsLoading(true);
        const api = `/api/staffs/`;
        const res = await handleAPI(api, undefined, "GET");
        setStaffs(res.data);
        console.log(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getAllStaffs();
  }, []);

  useEffect(() => {
    const getAllDoctors = async () => {
      try {
        const api = `/api/doctors/`;
        const res = await handleAPI(api, undefined, "GET");
        setDoctors(res.data);
        console.log(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      }
    };
    getAllDoctors();
  }, []);

  const staffColumn: TableProps["columns"] = [
    {
      key: "#",
      title: "#",
      dataIndex: "key",
      width: 50,
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "Tên nhân viên",
      title: "Tên nhân viên",
      dataIndex: "fullName",
      width: 150,
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
      key: "Vị trí",
      title: "Vị trí",
      dataIndex: "position",
      width: 100,
      render: (text) => <Tag color={getValue(text)}>{text}</Tag>,
    },
    {
      key: "Ngày bắt đầu công việc",
      title: "Ngày bắt đầu công việc",
      dataIndex: "startDate",
      width: 150,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      key: "Email",
      title: "Email",
      dataIndex: "email",
      width: 200,
    },
    {
      key: "action",
      title: "Sửa / Xóa",
      width: 80,
      render: () => (
        <div className="flex items-center justify-center gap-5">
          <Button shape="circle" icon={<CiEdit size={20} color="#1677ff" />} />
          <Button
            shape="circle"
            icon={<AiOutlineDelete size={20} color="#ff4d4f" />}
          />
        </div>
      ),
    },
  ];

  const doctorColumn: TableProps["columns"] = [
    {
      key: "#",
      title: "#",
      dataIndex: "key",
      width: 50,
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "Tên nhân viên",
      title: "Tên nhân viên",
      dataIndex: "fullName",
      width: 150,
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
      key: "Di động",
      title: "Di động",
      dataIndex: "movingService",
      width: 100,
      render: (text) => (
        <Tag color={getValue(text === true ? "yes" : "no")}>
          {text === true ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      key: "Ngày bắt đầu công việc",
      title: "Ngày bắt đầu công việc",
      dataIndex: "startDate",
      width: 150,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      key: "Email",
      title: "Email",
      dataIndex: "email",
      width: 200,
    },
    {
      key: "action",
      title: "Sửa / Xóa",
      width: 80,
      render: () => (
        <div className="flex items-center justify-center gap-5">
          <Button shape="circle" icon={<CiEdit size={20} color="#1677ff" />} />
          <Button
            shape="circle"
            icon={<AiOutlineDelete size={20} color="#ff4d4f" />}
          />
        </div>
      ),
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Nhân viên",
      children: (
        <CustomTable
          loading={isLoading}
          columns={staffColumn}
          dataSource={staffs}
          className="staff-table"
        />
      ),
    },
    {
      key: "2",
      label: "Bác sĩ",
      children: (
        <CustomTable
          loading={isLoading}
          columns={doctorColumn}
          dataSource={doctors}
          className="staff-table"
        />
      ),
    },
  ];

  return (
    <div>
      <div className="container mx-auto my-5 h-[calc(100vh-115px)] rounded-md bg-white p-5 shadow-sm lg:w-[95%]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="heading-3">Danh sách nhân viên</h1>
          <Button type="primary">Thêm nhân viên</Button>
        </div>
        <Divider />
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};

export default Staffs;
