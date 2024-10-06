import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts";
import { AuthState } from "../models/AuthModels";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addAuth } from "../redux/reducers/authReducer";
import { SignIn } from "../pages";

const MainRouter = () => {
  const auth: AuthState = useSelector((state: any) => state.authReducer.data);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = () => {
      const res = localStorage.getItem("auth_GenKiKoi");
      res && dispatch(addAuth(JSON.parse(res)));
    };
    getData();
    console.log("render");
  }, [auth.token]);

  console.log(auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/"
          element={auth.token ? <MainLayout /> : <Navigate to={"/sign-in"} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
