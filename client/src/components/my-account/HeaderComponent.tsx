import { Button, Divider, Dropdown, Input } from "antd";
import { MenuProps } from "antd/lib";
import { Sort } from "iconsax-react";
const { Search } = Input;

interface Props {
  heading: string;
  placeholder?: string;
  alt?: string;
  filter?: boolean;
  onSearch?: (value: string) => void;
  filterItems?: MenuProps["items"];
  onFilterSelect?: (key: string) => void;
}

const HeaderComponent = (props: Props) => {
  const { heading, placeholder, filter, onSearch, filterItems, onFilterSelect, alt } = props;
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="heading-3">{heading}</h1>
        {placeholder && (
          <Search
            title={alt}
            size="large"
            placeholder={placeholder}
            allowClear
            onSearch={onSearch}
            style={{ width: 300 }}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        )}
        {filter && filterItems && (
          <Dropdown
            menu={{
              items: filterItems,
              onClick: ({ key }) => onFilterSelect?.(key),
            }}
          >
            <Button icon={<Sort size={18} />}>Lọc</Button>
          </Dropdown>
        )}
      </div>
      <Divider />
    </div>
  );
};

export default HeaderComponent;
