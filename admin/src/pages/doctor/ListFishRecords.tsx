import { Breadcrumb, Button, message, TableProps } from "antd";
import { HeaderPage } from "../../components";
import { CustomTable } from "../../share";
import { Link, useLocation } from "react-router-dom";
import { Stickynote } from "iconsax-react";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";

const ListFishRecords = () => {
  const { pathname } = useLocation();
  const customerId = pathname.split("/")[3];
  const fishId = pathname.split("/")[5];
  const [records, setRecords] = useState([]);
  useEffect(() => {
    const getAllRecords = async () => {
      try {
        const api = `/api/medicalRecords/fishes/${fishId}`;

        const res = await handleAPI(api, undefined, "GET");

        setRecords(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      }
    };
    getAllRecords();
  }, [fishId]);

  const columns: TableProps["columns"] = [
    {
      key: "#",
      title: "#",
      dataIndex: "key",
      width: 70,
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "Mã lưu trữ",
      title: "Mã lưu trữ",
      dataIndex: "recordId",
      width: 180,
      render: (text) => (text.length > 20 ? `${text.slice(0, 17)}...` : text),
    },
    {
      key: "Dịch vụ khám",
      title: "Dịch vụ khám",
      dataIndex: "serviceName",
      width: 150,
    },
    {
      key: "Loại khám",
      title: "Loại khám",
      dataIndex: "examType",
      width: 130,
    },
    {
      key: "Bác sĩ khám",
      title: "Bác sĩ khám",
      dataIndex: "doctorName",
      render: (name) => "Bs. " + name,
    },
    {
      key: "Ngày khám",
      title: "Ngày khám",
      dataIndex: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      key: "Chi tiết",
      title: "Chi tiết",
      width: 150,
      render: (_text: any, record: any) => (
        <div className="text-center">
          <Link
            to={`/doctor/customers/${customerId}/fishes/${fishId}/records/${record.recordId}`}
          >
            <Button type="primary">Xem chi tiết</Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="section">
      <HeaderPage heading="Danh sách hồ sơ" placeholder="Tìm hồ sơ" />
      <Breadcrumb
        separator=">"
        items={[
          {
            title: (
              <Link to="/doctor/customers">
                <div className="flex items-center gap-2">
                  <Stickynote size={20} />
                  Hồ sơ khách hàng
                </div>
              </Link>
            ),
          },
          {
            title: <Link to="/doctor/customers">Hồ sơ bệnh án</Link>,
          },
          {
            title: (
              <Link to={`/doctor/customers/${customerId}/fishes`}>Danh sách cá</Link>
            ),
          },
          {
            title: "Danh sách hồ sơ bệnh án",
          },
        ]}
      />
      <div className="doctor-view fish-record mt-3">
        <CustomTable columns={columns} dataSource={records} />
      </div>
    </div>
  );
};

export default ListFishRecords;
