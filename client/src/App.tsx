import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AboutUs,
  Doctors,
  FAQ,
  Home,
  Images,
  Login,
  Services,
  SignUp,
} from "./pages";
import { MainLayout } from "./layouts";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="images" element={<Images />} />
          <Route path="services" element={<Services />} />
          <Route path="faq" element={<FAQ />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
