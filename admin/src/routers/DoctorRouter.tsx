import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "../layouts"

const DoctorRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default DoctorRouter
