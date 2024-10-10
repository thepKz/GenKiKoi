import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/auth";

const AuthRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AuthRouter;
