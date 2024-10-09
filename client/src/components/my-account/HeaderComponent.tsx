import { Avatar, Badge, ConfigProvider, Dropdown, Input, Layout, MenuProps } from "antd";
import { Home, Logout, Notification, User } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IAuth } from "../../types";
import { removeAuth } from "../../redux/reducers/authReducer";


const { Header } = Layout;

const { Search } = Input;

const HeaderComponent = () => {
  const dispatch = useDispatch();

  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  const profile: MenuProps["items"] = [
    {
      key: "1",
      icon: <Home size={18} />,
      label: <Link to="/">Trang chủ</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Đăng xuất",
      icon: <Logout size={18} />,
      onClick: () => dispatch(removeAuth({})),
    },
  ];
  return (
    <Header
      className="p-4 px-6 shadow-sm"
      style={{ backgroundColor: "white", marginBottom: 3, borderRadius: "0px 0px 10px 10px" }}
    >
      <div className="flex items-center justify-between">
        <Search
          size="large"
          placeholder="Tìm kiếm cuộc hẹn"
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

          <ConfigProvider
            theme={{
              inherit: false,
              token: {
                fontFamily: "Pro-Rounded",
              },
            }}
          >
            <Dropdown menu={{ items: profile }}>
              <Avatar
                src={auth.photoUrl}
                className="cursor-pointer"
                icon={<User size={18} />}
              />
            </Dropdown>
          </ConfigProvider>
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
