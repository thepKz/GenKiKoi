import { Button, Card, ConfigProvider, Empty, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleAPI } from "../../apis/handleAPI";
import { HeaderComponent } from "../../components";
import { IAuth } from "../../types";

const InspectionRecord = () => {
  const [ponds, setPonds] = useState([]);

  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllPondsByCustomer = async () => {
      try {
        setIsLoading(true);
        const api = `/api/ponds/customers/${auth.customerId}`;
        const res = await handleAPI(api, undefined, "GET");

        setPonds(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message || "Đã có lỗi xảy ra, vui lòng thử lại sau ít phút");
      } finally {
        setIsLoading(false);
      }
    };
    getAllPondsByCustomer();
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
      }}
    >
      <div className="my-account-section">
        {/* Header */}
        <HeaderComponent
          heading="Hồ sơ kiểm định"
          placeholder="Tìm hồ sơ"
        />
        {/* List Card */}
        <div className="flex h-[calc(100vh-170px)] flex-col gap-5 overflow-y-auto">
          {ponds.length > 0 ? (
            ponds.map((pond: any, i) => (
              <Card
                key={i}
                className="duration-100 ease-in hover:border-[#4096ff]"
              >
                <div className="flex items-center gap-5">
                  <div className="h-[150px] w-[250px] overflow-hidden rounded-lg">
                    <img
                      src="https://placehold.co/150x150"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex w-full">
                    <div className="flex flex-1 flex-col gap-2">
                      <p>
                        <span className="font-semibold">Mã báo cáo: </span>
                        {pond.recordId}
                      </p>
                      <p>
                        <span className="font-semibold">Kích cỡ hồ: </span>
                        {pond.pondSize}
                      </p>
                      <p>
                        <span className="font-semibold">Tình trạng: </span>
                        {pond.status}
                      </p>
                      <p>
                        <span className="font-semibold">Kích cỡ hệ thống lọc: </span>
                        {pond.filtrationSystem}
                      </p>
                      <p>
                        <span className="font-semibold">Ghi chú: </span>
                        {pond.notes}
                      </p>
                    </div>
                    <div className="flex w-1/5 flex-col gap-2 text-right">
                      <Link to={`/my-account/inspection-record/ponds/${pond.recordId}/records`}>
                        <Button type="primary">Xem chi tiết</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Empty
              className="mt-20"
              imageStyle={{ height: 200 }}
              description="Không tìm thấy hồ sơ nào"
            />
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default InspectionRecord;
