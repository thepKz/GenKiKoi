import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainLayout, MyAccountLayout } from "../layouts";
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
  ListFishRecords,
  MedicalRecord,
  NotFound,
  PaymentCancel,
  PaymentSuccess,
  PondDetail,
  Profile,
  RecordDetail,
  Services,
  SignIn,
  SignUp,
  UnAuthorized,
  VerifyAccount,
} from "../pages";
import Vaccine from "../pages/services/Vaccine";
import WaterQuality from "../pages/services/WaterQuality";
import { addAuth } from "../redux/reducers/authReducer";
import { IAuth } from "../types";
import DoctorDetail from "../pages/DoctorDetail";
import { Spin } from "antd";

const MainRouter = () => {
  const auth: IAuth = useSelector((state: any) => state.authReducer.data);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = () => {
      const res = localStorage.getItem("customer_GenKiKoi");
      if (res) {
        dispatch(addAuth(JSON.parse(res)));
      }
      setIsLoading(false);
    };
    getData();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
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
            path="doctors/:id"
            element={<DoctorDetail />}
          />
          <Route
            path="images"
            element={<Images />}
          />
          <Route path="services">
            <Route
              index
              element={<Services />}
            />
            <Route
              path="consulting-treatment"
              element={<ConsultingTreatment />}
            />
            <Route
              path="vaccine"
              element={<Vaccine />}
            />
            <Route
              path="water-quality"
              element={<WaterQuality />}
            />
          </Route>
          <Route
            path="faq"
            element={<FAQ />}
          />
          <Route
            path="booking"
            element={auth.token && auth.isVerified ? <Booking /> : <Navigate to={"/"} />}
          />
          <Route
            path="unauthorized"
            element={<UnAuthorized />}
          />
          <Route
            path="/verify-account"
            element={
              (auth.token && auth.isVerified) || !auth.token ? (
                <Navigate to={"/"} />
              ) : (
                <VerifyAccount />
              )
            }
          />
        </Route>
        <Route
          path="payment-success"
          element={<PaymentSuccess />}
        />
        <Route
          path="payment-cancel"
          element={<PaymentCancel />}
        />

        <Route
          path="/sign-in"
          element={
            !auth.token ? (
              <SignIn />
            ) : (
              <Navigate
                to="/"
                replace
              />
            )
          }
        />
        <Route
          path="/sign-up"
          element={
            !auth.token ? (
              <SignUp />
            ) : (
              <Navigate
                to="/"
                replace
              />
            )
          }
        />

        <Route
          path="/my-account"
          element={
            auth.token ? (
              auth.isVerified ? (
                <MyAccountLayout />
              ) : (
                <Navigate
                  to="/verify-account"
                  replace
                />
              )
            ) : (
              <Navigate
                to="/sign-in"
                replace
              />
            )
          }
        >
          <Route
            path="appointment"
            element={<Appointment />}
          />
          <Route path="medical-record">
            <Route
              index
              element={<MedicalRecord />}
            />
            <Route path="fishes/:fishId/records">
              <Route
                index
                element={<ListFishRecords />}
              />
              <Route
                path=":recordId"
                element={<RecordDetail />}
              />
            </Route>
          </Route>
          <Route path="inspection-record">
            <Route
              index
              element={<InspectionRecord />}
            />
            <Route path="ponds/:pondId/records">
              <Route
                index
                element={<PondDetail />}
              />
            </Route>
          </Route>
          <Route
            path="profile"
            element={<Profile />}
          />
          <Route
            path="history"
            element={<History />}
          />
        </Route>

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
