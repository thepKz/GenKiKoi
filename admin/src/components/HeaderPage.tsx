import { Button, Divider, Input } from "antd";
import { Sort } from "iconsax-react";
const { Search } = Input;

interface Props {
  heading: string;
  placeholder?: string;
  filter?: boolean;
}

const HeaderPage = (props: Props) => {
  const { heading, placeholder, filter } = props;
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="heading-3">{heading}</h1>
        {placeholder && (
          <Search
            size="large"
            placeholder={placeholder}
            allowClear
            style={{ width: 300 }}
          />
        )}
        {filter && <Button icon={<Sort size={18} />}>Lọc</Button>}
      </div>
      <Divider />
    </div>
  );
};

export default HeaderPage;
