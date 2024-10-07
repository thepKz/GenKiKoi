import { useDispatch, useSelector } from "react-redux";
import { AuthState } from "../models/AuthModels";
import { useEffect } from "react";
import { addAuth } from "../redux/reducers/authReducer";
import AuthRouter from "./AuthRouter";
import ManagerRouter from "./ManagerRouter";
import StaffRouter from "./StaffRouter";
import DoctorRouter from "./DoctorRouter";

const Routers = () => {
  const auth: AuthState = useSelector((state: any) => state.authReducer.data);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = () => {
      const res = localStorage.getItem("auth_GenKiKoi");
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
