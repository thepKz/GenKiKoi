import { Avatar, Breadcrumb, Col, ConfigProvider, Divider, message, Row, Spin } from "antd";
import { Link, useLocation } from "react-router-dom";
import { Stickynote } from "iconsax-react";
import { GiCirclingFish } from "react-icons/gi";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";
import { HeaderComponent } from "../../components";

const PondDetail = () => {
  const { pathname } = useLocation();
  const customerId = pathname.split("/")[3];
  const pondId = pathname.split("/")[4];
  const [record, setRecord] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getRecord = async () => {
      setIsLoading(true);
      try {
        const api = `/api/ponds/${pondId}`;

        const res = await handleAPI(api, undefined, "GET");

        setRecord(res.data);
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
      <div className="section">
        <HeaderComponent heading="Chi tiết hồ sơ" />
        <Breadcrumb
          separator=">"
          items={[
            {
              title: (
                <Link to="/my-account/inspection-record">
                  <div className="flex items-center gap-2">
                    <Stickynote size={20} />
                    Hồ sơ kiểm định
                  </div>
                </Link>
              ),
            },
            {
              title: "Chi tiết báo cáo",
            },
          ]}
        />
        <Row
          gutter={32}
          className="mt-1"
        >
          <Col span={7}>
            <div className="text-base">
              <h4 className="heading-4">Thông tin chung</h4>
              <Divider />
              <div className="mt-2 flex flex-col gap-1">
                <p>
                  <span className="font-semibold">Tên khách: </span>
                  {record?.customerName}
                </p>
                <p>
                  <span className="font-semibold">Tình trạng hồ cá: </span>
                  {record?.status}
                </p>
                <p>
                  <span className="font-semibold">Ngày kiểm định: </span>
                  {new Date(record?.date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Bác sĩ: </span>
                  {record?.doctorName}
                </p>
                <div className="">
                  <p className="font-semibold">Hình ảnh:</p>
                  <div className="mt-3 grid grid-cols-2 gap-5">
                    {record?.images.map((image: string, i: any) => (
                      <Avatar
                        key={i}
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
          <Col span={8}>
            <div className="text-base">
              <h4 className="heading-4">Tổng quan</h4>
              <Divider />
              <div className="flex flex-col gap-1">
                <p>
                  <span className="font-semibold">Độ pH: </span>
                  {record?.ph}
                </p>
                <p>
                  <span className="font-semibold">Nồng độ amonia: </span>
                  {record?.ammoniaLevel}%
                </p>
                <p>
                  <span className="font-semibold">Nồng độ nitrat: </span>
                  {record?.nitrateLevel}%
                </p>
                <p>
                  <span className="font-semibold">Hàm lượng oxy: </span>
                  {record?.oxygenLevel}%
                </p>
                <p>
                  <span className="font-semibold">Mức độ sạch sẽ: </span>
                  {record?.cleanliness}
                </p>
                <p>
                  <span className="font-semibold">Tình trạng hệ thống lọc: </span>
                  {record?.filtrationSystem}
                </p>
                <p>
                  <span className="font-semibold">Kích thước hồ cá: </span>
                  {record?.pondSize}
                </p>
                <p>
                  <span className="font-semibold">Nhiệt độ nước: </span>
                  {record?.waterTemperature}℃
                </p>
                <Divider />
                <p>
                  <span className="font-semibold">Ghi chú:</span>
                  <br />
                  {record?.notes}
                </p>
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
                  {record?.diagnosis}
                </p>
                <p>
                  <span className="font-semibold">Phác đồ điều trị:</span>
                  <br />
                  {record?.treatment}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
};

export default PondDetail;
