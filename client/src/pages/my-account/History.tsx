import { Button, Card, ConfigProvider, Divider, Tag } from "antd";

const History = () => {
  return (
    <div>
      <div className="container mx-auto my-5 h-[calc(100vh-115px)] rounded-md bg-white p-5 shadow-sm lg:w-[95%]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="heading-3">Lịch sử thanh toán</h1>
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
            <div className="flex flex-col gap-1">
              <p>
                <span className="font-semibold">Ngày thanh toán:</span> 10/09/2024
              </p>
              <p>
                <span className="font-semibold">Dịch vụ:</span> Kiểm định chất lượng nước
              </p>
              <p>
                <span className="font-semibold">Tổng tiền:</span> 200.000 vnđ
              </p>
              <p>
                <span className="font-semibold">Hình thức thanh toán:</span> Momo
              </p>
              <p>
                <span className="font-semibold">Trạng thái:</span>{" "}
                <Tag color="green">Hoàn thành</Tag>
              </p>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Hóa đơn:</span>{" "}
                <div className="">
                  <ConfigProvider
                    theme={{
                      inherit: false,
                      token: {
                        fontFamily: "Pro-Rounded",
                      },
                    }}
                  >
                    <Button
                      size="small"
                      type="link"
                      style={{ marginRight: 10 }}
                    >
                      Xem
                    </Button>
                    <Button
                      size="small"
                      type="primary"
                    >
                      Tải xuống
                    </Button>
                  </ConfigProvider>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-1">
              <p>
                <span className="font-semibold">Ngày thanh toán:</span> 10/09/2024
              </p>
              <p>
                <span className="font-semibold">Dịch vụ:</span> Kiểm định chất lượng nước
              </p>
              <p>
                <span className="font-semibold">Tổng tiền:</span> 200.000 vnđ
              </p>
              <p>
                <span className="font-semibold">Hình thức thanh toán:</span> Momo
              </p>
              <p>
                <span className="font-semibold">Trạng thái:</span>{" "}
                <Tag color="green">Hoàn thành</Tag>
              </p>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Hóa đơn:</span>{" "}
                <div className="">
                  <ConfigProvider
                    theme={{
                      inherit: false,
                      token: {
                        fontFamily: "Pro-Rounded",
                      },
                    }}
                  >
                    <Button
                      size="small"
                      type="link"
                      style={{ marginRight: 10 }}
                    >
                      Xem
                    </Button>
                    <Button
                      size="small"
                      type="primary"
                    >
                      Tải xuống
                    </Button>
                  </ConfigProvider>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-1">
              <p>
                <span className="font-semibold">Ngày thanh toán:</span> 10/09/2024
              </p>
              <p>
                <span className="font-semibold">Dịch vụ:</span> Kiểm định chất lượng nước
              </p>
              <p>
                <span className="font-semibold">Tổng tiền:</span> 200.000 vnđ
              </p>
              <p>
                <span className="font-semibold">Hình thức thanh toán:</span> Momo
              </p>
              <p>
                <span className="font-semibold">Trạng thái:</span>{" "}
                <Tag color="green">Hoàn thành</Tag>
              </p>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Hóa đơn:</span>{" "}
                <div className="">
                  <ConfigProvider
                    theme={{
                      inherit: false,
                      token: {
                        fontFamily: "Pro-Rounded",
                      },
                    }}
                  >
                    <Button
                      size="small"
                      type="link"
                      style={{ marginRight: 10 }}
                    >
                      Xem
                    </Button>
                    <Button
                      size="small"
                      type="primary"
                    >
                      Tải xuống
                    </Button>
                  </ConfigProvider>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default History;
