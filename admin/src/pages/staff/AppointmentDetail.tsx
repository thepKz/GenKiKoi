import { Breadcrumb } from "antd";
import { Calendar, CalendarCircle, CalendarSearch } from "iconsax-react";
import { Link } from "react-router-dom";
import { HeaderPage } from "../../components";

const AppointmentDetail = () => {
  return (
    <div className="container mx-auto my-5 h-[calc(100vh-115px)] rounded-md bg-white p-5 shadow-sm lg:w-[95%]">
      <HeaderPage heading="Chi tiết cuộc hẹn" />
      <Breadcrumb
        separator=">"
        items={[
          {
            title: (
              <Link to="/staff/customers">
                <div className="flex items-center gap-2">
                  <CalendarSearch size={20} />
                  Cuộc hẹn khách hàng
                </div>
              </Link>
            ),
          },
          {
            title: (
              <Link to="/staff/customers/348/appointments">
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  Danh sách cuộc hẹn
                </div>
              </Link>
            ),
          },
          {
            title: (
              <Link to="/staff/customers/348/appointments/485">
                <div className="flex items-center gap-2">
                  <CalendarCircle size={20} />
                  Chi tiết cuộc hẹn
                </div>
              </Link>
            ),
          },
        ]}
      />
    </div>
  );
};

export default AppointmentDetail;
