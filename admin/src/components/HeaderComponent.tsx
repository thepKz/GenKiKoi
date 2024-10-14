import {
  Avatar,
  Badge,
  ConfigProvider,
  Dropdown,
  Layout,
  MenuProps,
} from "antd";
import { Logout, Notification, User } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { removeAuth } from "../redux/reducers/authReducer";
import { IAuth } from "../types";

const { Header } = Layout;

const HeaderComponent = () => {
  const dispatch = useDispatch();

  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  const profile: MenuProps["items"] = [
    {
      key: "1",
      label: "Đăng xuất",
      icon: <Logout size={18} />,
      onClick: () => dispatch(removeAuth({})),
    },
  ];
  return (
    <Header
      className="p-4 px-6 shadow-sm"
      style={{
        backgroundColor: "white",
        marginBottom: 3,
        borderRadius: "0px 0px 10px 10px",
      }}
    >
      <div className="flex justify-end px-2">
        <div className="flex w-fit items-center gap-5">
          <Badge count={9} size="small" offset={[-4, 3]}>
            <Notification className="cursor-pointer" color="black" />
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
