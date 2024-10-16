import { Divider, Tabs, TabsProps } from "antd";
import { Consulting, Treatment } from "./components";

const CreateRecord = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Thăm khám",
      children: (

          <Treatment />
      ),
    },
    {
      key: "2",
      label: "Khảo sát chất lượng",
      children: (
        <div>
          <Consulting />
        </div>
      ),
    },
  ];
  return (
    <div className="section">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="heading-3">Tạo hồ sơ</h1>
      </div>
      <Divider />
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default CreateRecord;
