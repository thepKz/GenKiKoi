import { message, Rate, TableProps } from "antd";
import { HeaderPage } from "../../components";
import { CustomTable } from "../../share";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

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
      render: (_text, _record, index) => index + 1,
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
    <div className="section">
      <HeaderPage heading="Phản hồi từ khách hàng" filter />
      <div className="">
        <CustomTable columns={columns} dataSource={feedbacks} />
      </div>
    </div>
  );
};

export default Feedback;
