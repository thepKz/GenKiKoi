import { Breadcrumb, Button, Card, Tag } from "antd";
import { Stickynote } from "iconsax-react";
import { Link, useLocation } from "react-router-dom";
import { getValue } from "../../utils";
import { HeaderPage } from "../../components";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";

const ListFishes = () => {
  const { pathname } = useLocation();
  const customerId = pathname.split("/")[3];
  const [fishes, setFishes] = useState([]);

  useEffect(() => {
    const getAllFishesByCustomer = async () => {
      try {
        const api = `/api/fishes/${customerId}`;
        const res = await handleAPI(api, undefined, "GET");

        setFishes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllFishesByCustomer();
  }, []);

  return (
    <div className="section">
      <HeaderPage heading="Danh sách cá" placeholder="Tìm hồ sơ cá" />
      <Breadcrumb
        separator=">"
        items={[
          {
            title: (
              <Link to="/doctor/customers">
                <div className="flex items-center gap-2">
                  <Stickynote size={20} />
                  Hồ sơ khách hàng
                </div>
              </Link>
            ),
          },
          {
            title: <Link to="/doctor/customers">Hồ sơ bệnh án</Link>,
          },
          {
            title: "Danh sách cá",
          },
        ]}
      />
      <div className="mt-3 flex h-[calc(100vh-200px)] flex-col gap-5 overflow-y-auto">
        {fishes.map((fish: any, i) => (
          <Card key={i} className="duration-100 ease-in hover:border-[#4096ff]">
            <div className="flex items-center gap-5">
              <div className="">
                <img src={fish.photoUrl} alt="" className="rounded-lg" />
              </div>
              <div className="flex w-full">
                <div className="flex flex-1 flex-col gap-2">
                  <p>
                    <span className="font-semibold">Mã hồ sơ: </span>
                    {fish._id}
                  </p>
                  <p>
                    <span className="font-semibold">Tuổi: </span>
                    {fish.age}
                  </p>
                  <p>
                    <span className="font-semibold">Giới tính: </span>{" "}
                    {fish.gender &&
                      (fish.gender === "đực" ? (
                        <Tag color={getValue("đực")}>Đực</Tag>
                      ) : (
                        <Tag color={getValue("cái")}>Cái</Tag>
                      ))}
                  </p>
                  <p>
                    <span className="font-semibold">Kích thước: </span>
                    {fish.size} cm
                  </p>
                  <p>
                    <span className="font-semibold">Mô tả thêm: </span>
                    {fish.description}
                  </p>
                </div>
                <div className="flex w-1/5 flex-col gap-2 text-right">
                  <Link
                    to={`/doctor/customers/${customerId}/fishes/${fish._id}/records`}
                  >
                    <Button type="primary">Xem chi tiết</Button>
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

export default ListFishes;
