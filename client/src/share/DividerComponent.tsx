import { Divider } from "antd";
import { CSSProperties } from "react";

interface Props {
  variant?: "solid" | "dashed" | "dotted" | undefined;
  styles?: CSSProperties;
}

const DividerComponent = (props: Props) => {
  const { variant, styles } = props;
  return (
    <div
      className="lg:px-40"
      style={{
        backgroundColor: "#0c3c54",
        ...styles,
      }}
    >
      <Divider
        variant={variant || "solid"}
        style={{ borderColor: "white" }}
      />
    </div>
  );
};

export default DividerComponent;
