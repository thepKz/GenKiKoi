import { Button, Result } from "antd";
import { Link } from "react-router-dom";

interface Props {
  to: string;
}

const NotFound = (props: Props) => {
  const { to } = props;
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, bạn đang truy cập vào trang không tồn tại!"
      extra={
        <Button size="large" type="primary">
          <Link to={to}>Trang chủ</Link>
        </Button>
      }
    />
  );
};

export default NotFound;
