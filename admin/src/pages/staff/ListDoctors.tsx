import { Breadcrumb, Button, Card, Tag } from "antd";
import { HeaderPage } from "../../components";
import { getValue } from "../../utils";
import { Link } from "react-router-dom";
import { Calendar } from "iconsax-react";

const ListDoctors = () => {
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
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="duration-100 ease-in hover:border-[#4096ff]">
            <div className="flex gap-5">
              <div className="">
                <img
                  src="https://placehold.co/150x150"
                  alt=""
                  className="rounded-lg"
                />
              </div>
              <div className="flex w-full">
                <div className="flex flex-1 flex-col gap-2">
                  <p>
                    <span className="font-semibold">Họ và tên: </span> Đỗ Quang
                    Dũng
                  </p>
                  <p>
                    <span className="font-semibold">Email: </span>{" "}
                    doquangdung1782004@gmail.com
                  </p>
                  <p>
                    <span className="font-semibold">Giới tính: </span>{" "}
                    {true ? (
                      <Tag color={getValue("nam")}>Nam</Tag>
                    ) : (
                      <Tag color={getValue("nữ")}>Nữ</Tag>
                    )}
                  </p>
                  <p>
                    <span className="font-semibold">Di động: </span>
                    {true ? (
                      <Tag color={getValue("yes")}>Có</Tag>
                    ) : (
                      <Tag color={getValue("no")}>Không</Tag>
                    )}
                  </p>
                  <p>
                    <span className="font-semibold">Lịch làm việc: </span> T2,
                    T4, T5, T7
                  </p>
                </div>
                <div className="flex w-1/5 flex-col gap-2 text-right">
                  <Link to={"/staff/doctor-calendar/4737"}>
                    <Button type="primary">Xem chi tiết</Button>
                  </Link>
                  <Link to={"/staff/doctor-calendar/assign/4755"}>
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
