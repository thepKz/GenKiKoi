import { Button, ConfigProvider, message, Result } from "antd";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { handleAPI } from "../../apis/handleAPI";

const PaymentCancel = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const id = searchParams.get("id");
  const status = searchParams.get("status");

  useEffect(() => {
    const updatePayment = async () => {
      try {
        const api = `/api/payments/${id}`;
        await handleAPI(api, { status: status }, "POST");
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      }
    };
    updatePayment();
  }, [id]);

  return (
    <ConfigProvider
      theme={{
        inherit: false,
      }}
    >
      <Result
        className="mt-52"
        status="error"
        title="Bạn đã hủy thanh toán"
        subTitle="Cảm ơn bạn đã tin dùng dịch dụ của GenKiKoi"
        extra={[
          <Link to={"/"}>
            <Button
              size="large"
              type="primary"
            >
              Trang chủ
            </Button>
          </Link>,
          <Link to="/my-account/history">
            <Button size="large">Xem danh sách cuộc hẹn</Button>,
          </Link>,
        ]}
      />
    </ConfigProvider>
  );
};

export default PaymentCancel;
