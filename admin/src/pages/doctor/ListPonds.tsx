import { Breadcrumb, Button, Card, Tag } from "antd";
import { Stickynote } from "iconsax-react";
import { Link, useLocation } from "react-router-dom";
import { HeaderPage } from "../../components";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";

const ListPonds = () => {
  const { pathname } = useLocation();
  const customerId = pathname.split("/")[3];
  const [ponds, setPonds] = useState([]);

  useEffect(() => {
    const getAllPondsByCustomer = async () => {
      try {
        const api = `/api/ponds/customers/${customerId}`;
        const res = await handleAPI(api, undefined, "GET");

        setPonds(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPondsByCustomer();
  }, []);

  return (
    <div className="section">
      <HeaderPage heading="Danh sách báo cáo" placeholder="Tìm hồ báo cáo" />
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
            title: "Danh sách báo cáo",
          },
        ]}
      />
      <div className="mt-3 flex h-[calc(100vh-200px)] flex-col gap-5 overflow-y-auto">
        {ponds.map((pond: any, i) => (
          <Card key={i} className="duration-100 ease-in hover:border-[#4096ff]">
            <div className="flex items-center gap-5">
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
                    <span className="font-semibold">Mã báo cáo: </span>
                    {pond.recordId}
                  </p>
                  <p>
                    <span className="font-semibold">Kích cỡ hồ: </span>
                    {pond.pondSize}
                  </p>
                  <p>
                    <span className="font-semibold">Tình trạng: </span>
                    {pond.status}
                  </p>
                  <p>
                    <span className="font-semibold">
                      Kích cỡ hệ thống lọc:{" "}
                    </span>
                    {pond.filtrationSystem}
                  </p>
                  <p>
                    <span className="font-semibold">Ghi chú: </span>
                    {pond.notes}
                  </p>
                </div>
                <div className="flex w-1/5 flex-col gap-2 text-right">
                  <Link
                    to={`/doctor/customers/${customerId}/ponds/${pond.recordId}/records`}
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

export default ListPonds;
