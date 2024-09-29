import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainLayout, MyAccountLayout } from "../layouts";
import {
  AboutUs,
  ConsultingTreatment,
  Doctors,
  FAQ,
  Home,
  Images,
  SignIn,
  Services,
  SignUp,
  UnAuthorized,
  Appointment,
  MedicalRecord,
  Profile,
  History,
  InspectionRecord,
} from "../pages";
import { AuthState } from "../models/AuthModels";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addAuth } from "../redux/reducers/authReducer";

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
        <Route
          path="/sign-in"
          element={!auth.token ? <SignIn /> : <Navigate to={"/"} />}
        />
        <Route
          path="/sign-up"
          element={!auth.token ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/"
          element={<MainLayout />}
        >
          <Route
            index
            element={<Home />}
          />
          <Route
            path="about-us"
            element={<AboutUs />}
          />
          <Route
            path="doctors"
            element={<Doctors />}
          />
          <Route
            path="images"
            element={<Images />}
          />
          <Route
            path="services"
            element={<Services />}
          />
          <Route
            path="services/consulting-treatment"
            element={<ConsultingTreatment />}
          />
          <Route
            path="faq"
            element={<FAQ />}
          />
          <Route
            path="unauthorized"
            element={<UnAuthorized />}
          />
        </Route>
        <Route
          path="/my-account"
          element={<MyAccountLayout />}
        >
          <Route
            path="appointment"
            element={<Appointment />}
          />
          <Route
            path="medical-record"
            element={<MedicalRecord />}
          />
          <Route
            path="inspection-record"
            element={<InspectionRecord />}
          />
          <Route
            path="profile"
            element={<Profile />}
          />
          <Route
            path="history"
            element={<History />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
