import { Divider } from "antd";

const DividerComponent = () => {
  return (
    <div
      className="lg:px-40"
      style={{
        backgroundColor: "#0c3c54",
      }}
    >
      <Divider style={{ backgroundColor: "white" }} />
    </div>
  );
};

export default DividerComponent;
