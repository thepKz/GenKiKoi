import { Button, Card, ConfigProvider, Divider, message, Tag } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IAuth } from "../../types";
import { handleAPI } from "../../apis/handleAPI";
import { getValue } from "../../utils";
import { Link } from "react-router-dom";

const History = () => {
  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const getAllPayments = async () => {
      try {
        const api = `/api/payments/${auth.customerId}`;
        const res = await handleAPI(api, undefined, "GET");
        setPayments(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      }
    };
    getAllPayments();
  }, []);
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
          Button: {},
        },
      }}
    >
      <div className="container mx-auto my-5 h-[calc(100vh-115px)] rounded-md bg-white p-5 shadow-sm lg:w-[95%]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="heading-3">Lịch sử thanh toán</h1>
        </div>
        {/* Divider */}
        <Divider />
        {/* List Card */}
        <div className="flex h-[calc(100vh-230px)] flex-col gap-5 overflow-y-auto">
          {payments.map((payment: any) => (
            <Card>
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
                    target="_blank"
                  >
                    <Button type="primary">Thanh toán</Button>
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default History;
