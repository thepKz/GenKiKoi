import { Spin } from "antd";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: ReactNode;
  role: string;
}

const PrivateRoute = (props: Props) => {
  const { children, role } = props;

  const location = useLocation();
  const isLoading = false;
  const user = {
    name: "dung",
    role: "customer",
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  if (user.role !== role) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
