import { Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/auth";

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
    </Routes>
  );
};

export default AuthRouter;
