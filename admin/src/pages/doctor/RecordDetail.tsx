import {
  Avatar,
  Breadcrumb,
  Col,
  Divider,
  List,
  message,
  Row,
  Spin,
} from "antd";
import { Stickynote } from "iconsax-react";
import { Link, useLocation } from "react-router-dom";
import { GiCirclingFish } from "react-icons/gi";
import { HeaderPage } from "../../components";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";

const RecordDetail = () => {
  const { pathname } = useLocation();
  const medicalRecordId = pathname.split("/")[7];

  const [medicalRecord, setMedicalRecord] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getRecord = async () => {
      setIsLoading(true);
      try {
        const api = `/api/medicalRecords/${medicalRecordId}`;

        const res = await handleAPI(api, undefined, "GET");

        setMedicalRecord(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getRecord();
  }, []);

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <div className="section">
      <HeaderPage heading="Chi tiết hồ sơ" />
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
              <Link to={"/doctor/customers/345/fishes"}>Danh sách cá</Link>
            ),
          },
          {
            title: (
              <Link to={"/doctor/customers/345/fishes/453/records"}>
                Danh sách hồ sơ bệnh án
              </Link>
            ),
          },
          {
            title: "Chi tiết hồ sơ",
          },
        ]}
      />
      <Row gutter={32} className="mt-2">
        <Col span={7}>
          <div className="text-base">
            <h4 className="heading-4">Thông tin chung</h4>
            <Divider />
            <div className="mt-2 flex flex-col gap-1">
              <p>
                <span className="font-semibold">Tên khách: </span>
                {medicalRecord?.customerName}
              </p>
              <p>
                <span className="font-semibold">Loại khám: </span>
                {medicalRecord?.examType}
              </p>
              <p>
                <span className="font-semibold">Ngày khám: </span>
                {new Date(medicalRecord?.date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Bác sĩ: </span>
                {medicalRecord?.doctorName}
              </p>
              <div className="">
                <p className="font-semibold">Hình ảnh:</p>
                <div className="mt-3 grid grid-cols-2 gap-5">
                  {medicalRecord?.images.map((image: string) => (
                    <Avatar
                      shape="square"
                      style={{
                        backgroundColor: "transparent",
                        border: "2px dashed #ccc",
                        margin: "0px auto",
                      }}
                      src={image}
                      icon={<GiCirclingFish color="#ccc" />}
                      size={155}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={9}>
          <div className="text-base">
            <h4 className="heading-4">Chẩn đoán và điều trị</h4>
            <Divider />

            <div className="mt-2 flex flex-col gap-1">
              <p>
                <span className="font-semibold">Chẩn đoán: </span>
                {medicalRecord?.diagnosis}
              </p>
              <p>
                <span className="font-semibold">Phác đồ điều trị:</span>
                <br />
                {medicalRecord?.treatment}
              </p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="text-base">
            <h4 className="heading-4">Đơn thuốc</h4>
            <Divider />

            <div className="mt-3 rounded-md border-[1px] border-[#d9d9d9]">
              <List
                size="small"
                dataSource={medicalRecord?.medicines}
                renderItem={(item: { name: string; quantity: number }) => (
                  <List.Item>
                    {item.name}: {item.quantity} viên
                  </List.Item>
                )}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RecordDetail;
