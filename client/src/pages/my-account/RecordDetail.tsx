import { Avatar, Breadcrumb, Col, ConfigProvider, Divider, List, message, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { handleAPI } from "../../apis/handleAPI";
import { HeaderComponent } from "../../components";
import { GiCirclingFish } from "react-icons/gi";
import { Stickynote } from "iconsax-react";

const RecordDetail = () => {
  const { pathname } = useLocation();
  const fishId = pathname.split("/")[4];
  const medicalRecordId = pathname.split("/")[6];

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
    <ConfigProvider
      theme={{
        inherit: false,
        token: {
          fontFamily: "Pro-Rounded",
        },
        components: {
          Divider: {
            marginLG: 15,
          },
        },
      }}
    >
      <div className="my-account-section">
        <HeaderComponent heading="Chi tiết hồ sơ" />
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
              title: (
                <Link to={`/my-account/medical-record/fishes/${fishId}/records`}>
                  Danh sách hồ sơ bệnh án
                </Link>
              ),
            },
            {
              title: "Chi tiết hồ sơ",
            },
          ]}
        />
        <Row
          gutter={32}
          className="mt-2"
        >
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
    </ConfigProvider>
  );
};

export default RecordDetail;
