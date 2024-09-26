import { Avatar, Badge, Input, Layout } from "antd";
import { Notification, User } from "iconsax-react";

const { Header } = Layout;

const { Search } = Input;

const HeaderComponent = () => {
  return (
    <Header
      className="p-4 px-6 shadow-sm"
      style={{ backgroundColor: "white", marginBottom: 3, borderRadius: "0px 0px 10px 10px" }}
    >
      <div className="flex items-center justify-between">
        <Search
          size="large"
          placeholder="Search appointment"
          allowClear
          style={{ width: 300 }}
        />
        <div className="flex items-center gap-5">
          <Badge
            count={9}
            size="small"
            offset={[-4, 3]}
          >
            <Notification
              className="cursor-pointer"
              color="black"
            />
          </Badge>

          <Avatar
            className="cursor-pointer"
            icon={<User size={18} />}
          />
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
