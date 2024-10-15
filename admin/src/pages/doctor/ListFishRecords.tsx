import { Breadcrumb, Button, Divider, TableProps } from "antd";
import { HeaderPage } from "../../components";
import { CustomTable } from "../../share";
import { Link } from "react-router-dom";
import { Stickynote } from "iconsax-react";

const ListFishRecords = () => {
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
    },
    {
      key: "Dịch vụ khám",
      title: "Dịch vụ khám",
      dataIndex: "typeOfService",
    },
    {
      key: "Loại khám",
      title: "Loại khám",
      dataIndex: "visitType",
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
          <Link to={`/doctor/view-records/fishes/records/sncbf`}>
            <Button type="primary">Xem chi tiết</Button>
          </Link>
        </div>
      ),
    },
  ];

  const dataSource = [
    {
      id: 1,
      recordId: "67sn43j",
      typeOfService: "Tiêm ngừa",
      visitType: "Tái khám",
      doctorName: "Đỗ Quang Dũng",
      date: "2024-10-09T15:18:26.465+00:00",
    },
  ];
  return (
    <div className="container mx-auto my-5 h-[calc(100vh-115px)] rounded-md bg-white p-5 shadow-sm lg:w-[95%]">
      <HeaderPage heading="Danh sách hồ sơ" placeholder="Tìm hồ sơ" />
      <Divider />
      <Breadcrumb
        separator=">"
        items={[
          {
            title: (
              <Link to="/doctor/view-records">
                <div className="flex items-center gap-2">
                  <Stickynote size={20} />
                  Hồ sơ khách hàng
                </div>
              </Link>
            ),
          },
          {
            title: "Hồ sơ bệnh án",
          },
          {
            title: (
              <Link to={"/doctor/view-records/fishes"}>Danh sách cá</Link>
            ),
          },
          {
            title: "67069dv2b5759828c4f9e611",
          },
        ]}
      />
      <div className="mt-3 doctor-view">
        <CustomTable columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
};

export default ListFishRecords;
