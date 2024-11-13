import { Avatar, Breadcrumb, Col, ConfigProvider, Divider, message, Row, Spin } from "antd";
import { Stickynote } from "iconsax-react";
import { useEffect, useState } from "react";
import { GiCirclingFish } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { handleAPI } from "../../apis/handleAPI";
import { HeaderComponent } from "../../components";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
/* eslint-disable @typescript-eslint/no-unused-vars */

const PondDetail = () => {
  const { pathname } = useLocation();
  const pondId = pathname.split("/")[4];
  const [record, setRecord] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const getRecord = async () => {
      try {
        setIsLoading(true);
        const api = `/api/ponds/${pondId}`;

        const res = await handleAPI(api, undefined, "GET");

        setRecord(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message || "Có lỗi khi lấy dữ liệu, vui lòng thử lại sau ít phút!");
      } finally {
        setIsLoading(false);
      }
    };
    getRecord();
  }, []);

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
                      <div
                        key={i}
                        className="cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                      >
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
                      </div>
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
                  {record?.ph} (mg/L)
                </p>
                <p>
                  <span className="font-semibold">Nồng độ amonia: </span>
                  {record?.ammoniaLevel} (mg/L)
                </p>
                <p>
                  <span className="font-semibold">Nồng độ nitrat: </span>
                  {record?.nitrateLevel} (mg/L)
                </p>
                <p>
                  <span className="font-semibold">Hàm lượng oxy: </span>
                  {record?.oxygenLevel} (mg/L)
                </p>
                <p>
                  <span className="font-semibold">Mức độ sạch sẽ: </span>
                  {record?.cleanliness}
                </p>
                <p>
                  <span className="font-semibold">Kích cỡ hệ thống lọc: </span>
                  {record?.filtrationSystem}
                </p>
                <p>
                  <span className="font-semibold">Kích thước hồ cá: </span>
                  {record?.pondSize} (L)
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
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-h-[90vh] max-w-[90vw]">
                <motion.img
                  src={selectedImage}
                  alt="Hình ảnh chi tiết"
                  className="max-h-[70vh] max-w-[70vw] object-contain"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <button
                  className="absolute -right-10 -top-10 text-2xl text-white"
                  onClick={() => setSelectedImage(null)}
                >
                  <FaTimes />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ConfigProvider>
  );
};

export default PondDetail;
