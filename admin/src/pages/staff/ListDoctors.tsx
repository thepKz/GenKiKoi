import { Breadcrumb, Button, Card, message, Spin, Tag } from "antd";
import { HeaderPage } from "../../components";
import { getValue } from "../../utils";
import { Link } from "react-router-dom";
import { Calendar } from "iconsax-react";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";

const ListDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const api = `/api/doctorSchedules/`;
        const res = await handleAPI(api, undefined, "GET");

        setDoctors(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bác sĩ:", error);
        message.error("Không thể lấy danh sách bác sĩ");
      } finally {
        setIsLoading(false);
      }
    };
    getDoctors();
  }, []);

  const getWeekDates = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 là Chủ nhật, 1 là thứ Hai, ..., 6 là thứ Bảy
    const monday = new Date(today);
    monday.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return { monday, sunday };
  };

  const formatDate = (dateString: string) => {
    const [day, month] = dateString.split("/").map(Number);
    const date = new Date(new Date().getFullYear(), month - 1, day);
    const { monday, sunday } = getWeekDates();

    if (date >= monday && date <= sunday) {
      return `${day}/${month}`;
    }
    return null;
  };

  const countFutureDays = (weekSchedule: any[]) => {
    const { sunday } = getWeekDates();
    return weekSchedule.reduce((count, day) => {
      const [dayNum, monthNum] = day.dayOfWeek.split("/").map(Number);
      const date = new Date(new Date().getFullYear(), monthNum - 1, dayNum);
      return date > sunday ? count + 1 : count;
    }, 0);
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <div className="section">
      <HeaderPage heading="Danh sách lịch làm việc" placeholder="Tìm bác sĩ" />
      <Breadcrumb
        separator=">"
        items={[
          {
            title: (
              <Link to="/staff/doctor-calendar">
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  Lịch làm việc của bác sĩ
                </div>
              </Link>
            ),
          },
          {
            title: "Danh sách bác sĩ",
          },
        ]}
      />
      <div className="my-3 flex h-[calc(100vh-190px)] flex-col gap-5 overflow-y-auto">
        {doctors.map((doctor: any) => (
          <Card
            key={doctor.id}
            className="duration-100 ease-in hover:border-[#4096ff]"
          >
            <div className="flex gap-5">
              <div className="h-[150px] w-[250px] overflow-hidden rounded-lg">
                <img
                  src={doctor.photoUrl ?? "https://placehold.co/150x150"}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex w-full">
                <div className="flex flex-1 flex-col gap-2">
                  <p>
                    <span className="font-semibold">Họ và tên: </span>
                    {doctor.doctorName}
                  </p>
                  <p>
                    <span className="font-semibold">Email: </span>
                    {doctor.email}
                  </p>
                  <p>
                    <span className="font-semibold">Giới tính: </span>{" "}
                    <Tag color={getValue(doctor.gender)}>
                      {doctor.gender === "nam" ? "Nam" : "Nữ"}
                    </Tag>
                  </p>
                  <p>
                    <span className="font-semibold">Di động: </span>
                    <Tag color={getValue(doctor.movingService ? "yes" : "no")}>
                      {doctor.movingService ? "Có" : "Không"}
                    </Tag>
                  </p>
                  <p>
                    <span className="font-semibold">Lịch làm việc: </span>
                    {doctor.weekSchedule.map((day: any, index: any) => {
                      const formattedDate = formatDate(day.dayOfWeek);
                      return (
                        formattedDate && (
                          <Tag key={index} color="blue" className="mr-1">
                            {formattedDate}
                          </Tag>
                        )
                      );
                    })}
                    {countFutureDays(doctor.weekSchedule) > 0 && (
                      <Tag color="orange" className="">
                        + {countFutureDays(doctor.weekSchedule)} Ngày
                      </Tag>
                    )}
                  </p>
                </div>
                <div className="flex w-1/5 flex-col gap-2 text-right">
                  <Link to={`/staff/doctor-calendar/${doctor.doctorId}`}>
                    <Button type="primary">Xem chi tiết</Button>
                  </Link>
                  <Link to={`/staff/doctor-calendar/assign/${doctor.doctorId}`}>
                    <Button>Chỉnh lịch làm việc</Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListDoctors;
