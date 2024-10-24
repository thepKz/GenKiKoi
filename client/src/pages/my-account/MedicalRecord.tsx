import { Button, Card, ConfigProvider, Divider, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";
import { useSelector } from "react-redux";
import { IAuth } from "../../types";
import { getValue } from "../../utils";
import { Link } from "react-router-dom";
import { HeaderComponent } from "../../components";

const MedicalRecord = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fishes, setFishes] = useState<any>([]);

  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  useEffect(() => {
    const getAllFishesByCustomer = async () => {
      try {
        setIsLoading(true);
        const api = `/api/fishes/${auth.customerId}`;
        const res = await handleAPI(api, undefined, "GET");
        setFishes(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllFishesByCustomer();
  }, []);

  if (isLoading) {
    return <Spin />;
  }

  return (
    <ConfigProvider
      theme={{
        inherit: false,
        token: {
          fontFamily: "Pro-Rounded",
        },
      }}
    >
      <div className="section">
        {/* Header */}
        <HeaderComponent
          heading="Hồ sơ điều trị"
          placeholder="Tìm hồ sơ"
        />
        {/* List Card */}
        <div className="flex h-[calc(100vh-170px)] flex-col gap-5 overflow-y-auto">
          {fishes.map((fish: any, i: any) => (
            <Card
              key={i}
              className="duration-100 ease-in hover:border-[#4096ff]"
            >
              <div className="flex items-center gap-5">
                <div className="h-[150px] w-[250px] overflow-hidden rounded-lg">
                  <img
                    src={fish.photoUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
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
                  <div className="">
                    <Link to="#">
                      <Button type="primary">Xem chi tiết</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default MedicalRecord;
