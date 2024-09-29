import { Card, ConfigProvider, Divider, Tag } from "antd";

const InspectionRecord = () => {
  return (
    <div>
      <div className="container mx-auto my-5 h-[calc(100vh-115px)] rounded-md bg-white p-5 shadow-sm lg:w-[95%]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="heading-3">Hồ sơ kiểm định</h1>
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
        <div className="flex h-[500px] flex-col gap-5 overflow-y-auto">
          <Card>
            <div className="flex gap-5">
              <div className="">
                <img
                  src="https://placehold.co/300x150"
                  alt=""
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>
                  <span className="font-semibold">Tên hồ cá:</span> Hồ C
                </p>
                <p>
                  <span className="font-semibold">Số lượng cá:</span> 10
                </p>
                <p>
                  <span className="font-semibold">Ngày kiểm định gần nhất:</span> 20-09-2024
                </p>
                <p>
                  <span className="font-semibold">Tình trạng chất lượng nước hiện tại:</span>{" "}
                  <Tag color="green">Tốt</Tag>
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
              <div className="flex flex-col gap-1">
                <p>
                  <span className="font-semibold">Tên hồ cá:</span> Hồ C
                </p>
                <p>
                  <span className="font-semibold">Số lượng cá:</span> 10
                </p>
                <p>
                  <span className="font-semibold">Ngày kiểm định gần nhất:</span> 20-09-2024
                </p>
                <p>
                  <span className="font-semibold">Tình trạng chất lượng nước hiện tại:</span>{" "}
                  <Tag color="green">Tốt</Tag>
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
              <div className="flex flex-col gap-1">
                <p>
                  <span className="font-semibold">Tên hồ cá:</span> Hồ C
                </p>
                <p>
                  <span className="font-semibold">Số lượng cá:</span> 10
                </p>
                <p>
                  <span className="font-semibold">Ngày kiểm định gần nhất:</span> 20-09-2024
                </p>
                <p>
                  <span className="font-semibold">Tình trạng chất lượng nước hiện tại:</span>{" "}
                  <Tag color="green">Tốt</Tag>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InspectionRecord;
