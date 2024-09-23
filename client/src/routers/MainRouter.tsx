import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts";
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
} from "../pages";
import { AuthState } from "../models/AuthModels";
import { useSelector } from "react-redux";

const MainRouter = () => {
  const auth: AuthState = useSelector((state: any) => state.authReducer.data);

  console.log(auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/sign-in"
          element={!auth ? <SignIn /> : <Navigate to={"/"} />}
        />
        <Route
          path="/sign-up"
          element={!auth ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/*"
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
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
