import { Button, Divider, Input } from "antd";
import { Sort } from "iconsax-react";
const { Search } = Input;

interface Props {
  heading: string;
  placeholder?: string;
  filter?: boolean;
  onSearch?: (value: string) => void;
}

const HeaderPage = (props: Props) => {
  const { heading, placeholder, filter, onSearch } = props;
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="heading-3">{heading}</h1>
        {placeholder && (
          <Search
            size="large"
            placeholder={placeholder}
            allowClear
            onSearch={onSearch}
            style={{ width: 300 }}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        )}
        {filter && <Button icon={<Sort size={18} />}>Lọc</Button>}
      </div>
      <Divider />
    </div>
  );
};

export default HeaderPage;
