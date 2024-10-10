import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import ManagerRouter from "./ManagerRouter";
import StaffRouter from "./StaffRouter";
import DoctorRouter from "./DoctorRouter";
import { IAuth } from "../types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAuth } from "../redux/reducers/authReducer";

const Routers = () => {
  const auth: IAuth = useSelector((state: any) => state.authReducer.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = () => {
      const res = localStorage.getItem("admin_GenKiKoi");
      res && dispatch(addAuth(JSON.parse(res)));
    };
    getData();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {auth.token ? (
          <>
            {auth.role === "manager" && (
              <Route path="/manager/*" element={<ManagerRouter />} />
            )}
            {auth.role === "staff" && (
              <Route path="/staff/*" element={<StaffRouter />} />
            )}
            {auth.role === "doctor" && (
              <Route path="/doctor/*" element={<DoctorRouter />} />
            )}
            <Route
              path="*"
              element={<Navigate to={`/${auth.role}`} replace />}
            />
          </>
        ) : (
          <>
            <Route path="/auth/*" element={<AuthRouter />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
