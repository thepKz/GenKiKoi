import { Breadcrumb, Button, ConfigProvider, message, Spin } from "antd";
import { TableProps } from "antd/lib";
import { Stickynote } from "iconsax-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { handleAPI } from "../../apis/handleAPI";
import { HeaderComponent } from "../../components";
import { CustomTable } from "../../share";

const ListFishRecords = () => {
  const { pathname } = useLocation();

  const fishId = pathname.split("/")[4];
  const [records, setRecords] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllRecords = async () => {
      try {
        setIsLoading(true);
        const api = `/api/medicalRecords/fishes/${fishId}`;

        const res = await handleAPI(api, undefined, "GET");

        setRecords(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
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
          placeholder="Tìm hồ sơ"
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
            dataSource={records}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default ListFishRecords;
