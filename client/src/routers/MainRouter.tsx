import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/sign-in"
          element={<SignIn />}
        />
        <Route
          path="/sign-up"
          element={<SignUp />}
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
