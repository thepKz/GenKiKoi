import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "../pages";

const AuthRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AuthRouter;
