import { Breadcrumb, Button, Card, Divider, Tag } from "antd";
import { Stickynote } from "iconsax-react";
import { Link } from "react-router-dom";
import { getValue } from "../../utils";
import { HeaderPage } from "../../components";

const ListFishes = () => {
  return (
    <div>
      <div className="container mx-auto my-5 h-[calc(100vh-115px)] rounded-md bg-white p-5 shadow-sm lg:w-[95%]">
        <HeaderPage heading="Danh sách cá" placeholder="Tìm hồ sơ cá" />
        <Divider />
        <Breadcrumb
          separator=">"
          items={[
            {
              title: (
                <Link to="/doctor/view-records">
                  <div className="flex items-center gap-2">
                    <Stickynote size={20} />
                    Hồ sơ khách hàng
                  </div>
                </Link>
              ),
            },
            {
              title: "Hồ sơ bệnh án",
            },
            {
              title: "Danh sách cá",
            },
          ]}
        />
        <div className="mt-3 flex h-[calc(100vh-270px)] flex-col gap-5 overflow-y-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card
              key={i}
              className="duration-100 ease-in hover:border-[#4096ff]"
            >
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
                      <span className="font-semibold">Mã hồ sơ: </span>
                      67069dv2b5759828c4f9e611
                    </p>
                    <p>
                      <span className="font-semibold">Giống loại: </span>Showa
                      Sanke
                    </p>
                    <p>
                      <span className="font-semibold">Giới tính: </span>{" "}
                      {true ? (
                        <Tag color={getValue("đực")}>Đực</Tag>
                      ) : (
                        <Tag color={getValue("cái")}>Cái</Tag>
                      )}
                    </p>
                    <p>
                      <span className="font-semibold">Kích thước: </span>
                      30cm x 15cm
                    </p>
                    <p>
                      <span className="font-semibold">Mô tả thêm:</span>Lorem
                      ipsum dolor sit amet consectetur adipisicing elit. Quae,
                      dolore.
                    </p>
                  </div>
                  <div className="flex w-1/5 flex-col gap-2 text-right">
                    <Link to={"/doctor/view-records/fishes/records"}>
                      <Button type="primary">Xem chi tiết</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListFishes;
