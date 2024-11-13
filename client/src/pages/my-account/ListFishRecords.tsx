import { Breadcrumb, Button, ConfigProvider, message, Spin } from "antd";
import { TableProps } from "antd/lib";
import { Stickynote } from "iconsax-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { handleAPI } from "../../apis/handleAPI";
import { HeaderComponent } from "../../components";
import { CustomTable } from "../../share";
import { removeVietnameseTones } from "../../utils";

const ListFishRecords = () => {
  const { pathname } = useLocation();

  const fishId = pathname.split("/")[4];
  const [records, setRecords] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const filteredRecords = records.filter((record: any) => {
    const searchValue = removeVietnameseTones(searchText.toLowerCase());
    const serviceName = removeVietnameseTones(record.serviceName.toLowerCase());
    const doctorName = removeVietnameseTones(record.doctorName.toLowerCase());

    return (
      serviceName.includes(searchValue) ||
      doctorName.includes(searchValue) ||
      record.recordId.includes(searchValue)
    );
  });

  useEffect(() => {
    const getAllRecords = async () => {
      try {
        setIsLoading(true);
        const api = `/api/medicalRecords/fishes/${fishId}`;

        const res = await handleAPI(api, undefined, "GET");

        setRecords(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message || "Có lỗi khi lấy dữ liệu, vui lòng thử lại sau ít phút!");
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
      render: (_text, _record, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      key: "Mã lưu trữ",
      title: "Mã lưu trữ",
      dataIndex: "recordId",
      width: 230,
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
      filters: [
        {
          text: "Khám bệnh",
          value: "Khám bệnh",
        },
        {
          text: "Tái khám",
          value: "Tái khám",
        },
      ],
      onFilter: (value: any, record) => record.examType === value,
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
      sorter: (a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      },
    },
    {
      key: "Chi tiết",
      title: "Chi tiết",
      width: 150,
      render: (_text: any, record: any) => (
        <div className="text-center">
          <Link to={`/my-account/medical-record/fishes/${fishId}/records/${record.recordId}`}>
            <Button type="primary">Xem chi tiết</Button>
          </Link>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="my-account-section flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        inherit: false,
        token: {
          fontFamily: "Pro-Rounded",
        },
      }}
    >
      <div className="my-account-section">
        <HeaderComponent
          heading="Danh sách hồ sơ"
          alt="Tìm hồ sơ (Mã hồ sơ, dịch vụ, bác sĩ)"
          placeholder="Tìm hồ sơ (Mã hồ sơ, dịch vụ, bác sĩ)"
          onSearch={handleSearch}
        />
        <Breadcrumb
          separator=">"
          items={[
            {
              title: (
                <Link to="/my-account/medical-record">
                  <div className="flex items-center gap-2">
                    <Stickynote size={20} />
                    Hồ sơ điều trị
                  </div>
                </Link>
              ),
            },
            {
              title: "Danh sách hồ sơ bệnh án",
            },
          ]}
        />
        <div className="doctor-view fish-record mt-3">
          <CustomTable
            columns={columns}
            dataSource={filteredRecords}
            onChange={(pagination) => setPagination(pagination)}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default ListFishRecords;
