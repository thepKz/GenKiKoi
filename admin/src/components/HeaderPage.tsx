import { Input } from "antd";
const { Search } = Input;

interface Props {
  heading: string;
  placeholder: string;
}

const HeaderPage = (props: Props) => {
  const { heading, placeholder } = props;
  return (
    <div className="flex items-center justify-between">
      <h1 className="heading-3">{heading}</h1>
      <Search
        size="large"
        placeholder={placeholder}
        allowClear
        style={{ width: 300 }}
      />
    </div>
  );
};

export default HeaderPage;
