import { MenuProps, message, Rate, TableProps } from "antd";
import { HeaderPage } from "../../components";
import { CustomTable } from "../../share";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<any>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const filterItems: MenuProps["items"] = [
    {
      key: "all",
      label: "Tất cả đánh giá",
    },
    {
      key: "high",
      label: "Đánh giá cao (4-5 sao)",
    },
    {
      key: "medium",
      label: "Đánh giá trung bình (3 sao)",
    },
    {
      key: "low",
      label: "Đánh giá thấp (1-2 sao)",
    },
  ];

  const handleFilterSelect = (key: string) => {
    const filteredData = feedbacks.filter((feedback: any) => {
      switch (key) {
        case "high":
          return feedback.rating >= 4;
        case "medium":
          return feedback.rating === 3;
        case "low":
          return feedback.rating <= 2;
        default:
          return true;
      }
    });
    setFeedbacks(filteredData);
  };

  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        const api = `/api/feedbacks/doctor`;
        const res = await handleAPI(api, undefined, "GET");
        setFeedbacks(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
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

  return (
    <div className="section doctor-view feedbacks">
      <HeaderPage
        heading="Phản hồi từ khách hàng"
        filter
        filterItems={filterItems}
        onFilterSelect={handleFilterSelect}
      />
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
