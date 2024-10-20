import { Breadcrumb } from "antd";
import { Calendar, CalendarCircle, CalendarSearch } from "iconsax-react";
import { Link } from "react-router-dom";
import { HeaderPage } from "../../components";

const AppointmentDetail = () => {
  return (
    <div className="section">
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
