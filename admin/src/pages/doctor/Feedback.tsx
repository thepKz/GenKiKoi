import { message, Rate, Spin, TableProps } from "antd";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";
import { HeaderPage } from "../../components";
import { CustomTable } from "../../share";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        setIsLoading(true);
        const api = `/api/feedbacks/doctor`;
        const res = await handleAPI(api, undefined, "GET");
        setFeedbacks(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(
          error.message || "Có lỗi đã xảy ra, vui lòng thử lại sau ít phút",
        );
      } finally {
        setIsLoading(false);
      }
    };
    getFeedbacks();
  }, []);

  const columns: TableProps["columns"] = [
    {
      key: "#",
      title: "#",
      dataIndex: "key",
      width: 70,
      render: (_text, _record, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      key: "Tên khách hàng",
      title: "Tên khách hàng",
      dataIndex: "customerName",
      width: 200,
    },
    {
      key: "Tên dịch vụ",
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      width: 200,
    },
    {
      key: "Đánh giá",
      title: "Đánh giá",
      dataIndex: "rating",
      render: (star) => <Rate value={star} />,
    },
    {
      key: "Bình luận",
      title: "Bình luận",
      dataIndex: "comment",
    },
    {
      key: "Ngày đánh giá",
      title: "Ngày đánh giá",
      dataIndex: "feedbackDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  if (isLoading) {
    return (
      <div className="section flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="section doctor-view feedbacks">
      <HeaderPage heading="Phản hồi từ khách hàng" filter />
      <div className="">
        <CustomTable
          columns={columns}
          dataSource={feedbacks}
          onChange={(pagination) => setPagination(pagination)}
        />
      </div>
    </div>
  );
};

export default Feedback;
