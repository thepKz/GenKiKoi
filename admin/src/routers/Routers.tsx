import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addAuth } from "../redux/reducers/authReducer";
import AuthRouter from "./AuthRouter";
import ManagerRouter from "./ManagerRouter";
import StaffRouter from "./StaffRouter";
import DoctorRouter from "./DoctorRouter";
import { IAuth } from "../types";

// Không chắc cách tổ chức này là tốt
const Routers = () => {
  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = () => {
      const res = localStorage.getItem("admin_GenKiKoi");
      res && dispatch(addAuth(JSON.parse(res)));
    };
    getData();
  }, [auth.token]);

  return auth.token ? (
    auth.role === "manager" ? (
      <ManagerRouter />
    ) : auth.role === "staff" ? (
      <StaffRouter />
    ) : (
      <DoctorRouter />
    )
  ) : (
    <AuthRouter />
  );
};

export default Routers;
