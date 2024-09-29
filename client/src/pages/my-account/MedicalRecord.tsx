import { Button, Card, ConfigProvider, Divider, Tag } from "antd";
import { Sort } from "iconsax-react";

const MedicalRecord = () => {
  return (
    <div>
      <div className="container mx-auto my-5 h-[calc(100vh-115px)] rounded-md bg-white p-5 shadow-sm lg:w-[95%]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="heading-3">Hồ sơ điều trị</h1>
          <div className="">
            <ConfigProvider
              theme={{
                inherit: false,
                token: {
                  fontFamily: "Pro-Rounded",
                },
              }}
            >
              <Button icon={<Sort size={18} />}>Lọc</Button>
            </ConfigProvider>
          </div>
        </div>
        {/* Divider */}
        <ConfigProvider
          theme={{
            components: {
              Divider: {
                marginLG: 15,
              },
            },
          }}
        >
          <Divider />
        </ConfigProvider>
        {/* List Card */}
        <div className="flex h-[calc(100vh-230px)] flex-col gap-5 overflow-y-auto">
          <Card>
            <div className="flex gap-5">
              <div className="">
                <img
                  src="https://placehold.co/300x150"
                  alt=""
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-between">
                <p>
                  <span className="font-semibold">Tên con cá:</span> MeoMeo
                </p>
                <p>
                  <span className="font-semibold">Giống loại:</span> Kohaku
                </p>
                <p>
                  <span className="font-semibold">Tuổi:</span> 10
                </p>
                <p>
                  <span className="font-semibold">Số lần điều trị:</span> 10
                </p>
                <p>
                  <span className="font-semibold">Ngày điều trị gần nhất:</span> 20-09-2024
                </p>
                <p>
                  <span className="font-semibold">Tình trạng sức khỏe hiện tại:</span>{" "}
                  <Tag color="green">Đang điều trị</Tag>
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex gap-5">
              <div className="">
                <img
                  src="https://placehold.co/300x150"
                  alt=""
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-between">
                <p>
                  <span className="font-semibold">Tên con cá:</span> MeoMeo
                </p>
                <p>
                  <span className="font-semibold">Giống loại:</span> Kohaku
                </p>
                <p>
                  <span className="font-semibold">Tuổi:</span> 10
                </p>
                <p>
                  <span className="font-semibold">Số lần điều trị:</span> 10
                </p>
                <p>
                  <span className="font-semibold">Ngày điều trị gần nhất:</span> 20-09-2024
                </p>
                <p>
                  <span className="font-semibold">Tình trạng sức khỏe hiện tại:</span>{" "}
                  <Tag color="green">Đang điều trị</Tag>
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex gap-5">
              <div className="">
                <img
                  src="https://placehold.co/300x150"
                  alt=""
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-between">
                <p>
                  <span className="font-semibold">Tên con cá:</span> MeoMeo
                </p>
                <p>
                  <span className="font-semibold">Giống loại:</span> Kohaku
                </p>
                <p>
                  <span className="font-semibold">Tuổi:</span> 10
                </p>
                <p>
                  <span className="font-semibold">Số lần điều trị:</span> 10
                </p>
                <p>
                  <span className="font-semibold">Ngày điều trị gần nhất:</span> 20-09-2024
                </p>
                <p>
                  <span className="font-semibold">Tình trạng sức khỏe hiện tại:</span>{" "}
                  <Tag color="green">Đang điều trị</Tag>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecord;
