import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "../hooks/scrollToTop";
import { MainLayout, MyAccountLayout } from "../layouts";
import { AuthState } from "../models/AuthModels";
import {
  AboutUs,
  Appointment,
  Booking,
  ConsultingTreatment,
  Doctors,
  FAQ,
  History,
  Home,
  Images,
  InspectionRecord,
  MedicalRecord,
  NotFound,
  Profile,
  Services,
  SignIn,
  SignUp,
  UnAuthorized,
} from "../pages";
import Vaccine from "../pages/services/Vaccine";
import WaterQuality from "../pages/services/WaterQuality";
import { addAuth } from "../redux/reducers/authReducer";

const MainRouter = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const auth: AuthState = useSelector((state: any) => state.authReducer.data);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = () => {
      const res = localStorage.getItem("auth_GenKiKoi");
      if (res) {
        dispatch(addAuth(JSON.parse(res)));
      }
    };
    getData();
    console.log("render");
  }, [dispatch]);

  console.log(auth);

  return (
    <BrowserRouter>
      <ScrollToTop />
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
            path="services/vaccine"
            element={<Vaccine />}
          />
          <Route
           path="services/water-quality"
          element={<WaterQuality />}
          />
          <Route
            path="faq"
            element={<FAQ />}
          />
          <Route
            path="booking"
            element={<Booking />}
          />
          <Route
            path="unauthorized"
            element={<UnAuthorized />}
          />
        </Route>
        <Route
          path="/my-account"
          element={auth.token ? <MyAccountLayout /> : <Navigate to="/sign-in" />}
        >
          <Route
            path="appointment"
            element={auth.token ? <Appointment /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="medical-record"
            element={auth.token ? <MedicalRecord /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="inspection-record"
            element={auth.token ? <InspectionRecord /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="profile"
            element={auth.token ? <Profile /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="history"
            element={auth.token ? <History /> : <Navigate to="/sign-in" />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
