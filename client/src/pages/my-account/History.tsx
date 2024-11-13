import { Button, Card, ConfigProvider, Empty, message, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleAPI } from "../../apis/handleAPI";
import { HeaderComponent } from "../../components";
import { IAuth } from "../../types";
import { getValue, removeVietnameseTones } from "../../utils";

const History = () => {
  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchText, setSearchText] = useState("");

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  useEffect(() => {
    const getAllPayments = async () => {
      try {
        setIsLoading(true);
        const api = `/api/payments/${auth.customerId}`;
        const res = await handleAPI(api, undefined, "GET");
        setPayments(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getAllPayments();
  }, []);

  const filteredPayments = payments.filter((payment: any) => {
    const searchValue = removeVietnameseTones(searchText.toLowerCase());
    const serviceName = removeVietnameseTones(payment.serviceName.toLowerCase());
    const status = removeVietnameseTones(payment.status.toLowerCase());

    return serviceName.includes(searchValue) || status.includes(searchValue);
  });

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
          heading="Danh sách hóa đơn"
          placeholder="Tìm hóa đơn (Dịch vụ, trạng thái)"
          alt="Tìm hóa đơn (Dịch vụ, trạng thái)"
          onSearch={handleSearch}
        />
        {/* List Card */}
        <div className="flex h-[calc(100vh-170px)] flex-col gap-5 overflow-y-auto">
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment: any, i) => (
              <Card
                key={i}
                className="duration-100 ease-in hover:border-[#4096ff]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <p>
                      <span className="font-semibold">Ngày tạo:</span>{" "}
                      {new Date(payment.date).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Dịch vụ:</span> {payment.serviceName}
                    </p>
                    <p>
                      <span className="font-semibold">Tổng tiền:</span>{" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(payment.totalPrice)}
                    </p>
                    <p>
                      <span className="font-semibold">Trạng thái:</span>{" "}
                      <Tag color={getValue(payment.status)}>
                        {payment.status === "PAID"
                          ? "Đã thanh toán"
                          : payment.status === "PENDING"
                            ? "Đang chờ xử lý"
                            : "Đã hủy"}
                      </Tag>
                    </p>
                  </div>
                  {payment.status === "PENDING" && (
                    <Link
                      to={`https://pay.payos.vn/web/${payment.paymentLinkId}`}
                      target="_self"
                    >
                      <Button type="primary">Thanh toán</Button>
                    </Link>
                  )}
                </div>
              </Card>
            ))
          ) : (
            <Empty
              className="mt-20"
              imageStyle={{ height: 200 }}
              description="Danh sách lịch sử giao dịch trống"
            />
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default History;
