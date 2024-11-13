import { Breadcrumb, Button, message, Spin, TableProps } from "antd";
import { HeaderPage } from "../../components";
import { CustomTable } from "../../share";
import { Link, useLocation } from "react-router-dom";
import { Stickynote } from "iconsax-react";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";
import { removeVietnameseTones } from "../../utils";

const ListFishRecords = () => {
  const { pathname } = useLocation();
  const customerId = pathname.split("/")[3];
  const fishId = pathname.split("/")[5];
  const [records, setRecords] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  useEffect(() => {
    const getAllRecords = async () => {
      try {
        setIsLoading(true);
        const api = `/api/medicalRecords/fishes/${fishId}`;

        const res = await handleAPI(api, undefined, "GET");

        setRecords(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(
          error.message ||
            "Có lỗi khi lấy dữ liệu, vui lòng thử lại sau ít phút!",
        );
      } finally {
        setIsLoading(false);
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
      width: 250,
    },
    {
      key: "Dịch vụ khám",
      title: "Dịch vụ khám",
      dataIndex: "serviceName",
      width: 200,
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

  const filteredRecords = records.filter((record: any) => {
    const searchValue = removeVietnameseTones(searchText.toLowerCase());
    const recordId = removeVietnameseTones(record.recordId.toLowerCase());
    const serviceName = removeVietnameseTones(record.serviceName.toLowerCase());
    const doctorName = removeVietnameseTones(record.doctorName.toLowerCase());

    return (
      recordId.includes(searchValue) ||
      doctorName.includes(searchValue) ||
      serviceName.includes(searchValue)
    );
  });

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
        heading="Danh sách hồ sơ"
        placeholder="Tìm hồ sơ (Mã hồ sơ, tên dịch vụ, tên bác sĩ)"
        alt="Tìm hồ sơ (Mã hồ sơ, tên dịch vụ, tên bác sĩ)"
        onSearch={handleSearch}
      />
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
            title: (
              <Link to={`/doctor/customers/${customerId}/fishes`}>
                Danh sách cá
              </Link>
            ),
          },
          {
            title: "Danh sách hồ sơ bệnh án",
          },
        ]}
      />
      <div className="doctor-view fish-record mt-3">
        <CustomTable columns={columns} dataSource={filteredRecords} />
      </div>
    </div>
  );
};

export default ListFishRecords;
