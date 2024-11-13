import { Breadcrumb, Button, Card, Empty, message, Spin } from "antd";
import { Stickynote } from "iconsax-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { handleAPI } from "../../apis/handleAPI";
import { HeaderPage } from "../../components";
import { removeVietnameseTones } from "../../utils";

const ListPonds = () => {
  const { pathname } = useLocation();
  const customerId = pathname.split("/")[3];
  const [ponds, setPonds] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  useEffect(() => {
    const getAllPondsByCustomer = async () => {
      try {
        setIsLoading(true);
        const api = `/api/ponds/customers/${customerId}`;
        const res = await handleAPI(api, undefined, "GET");

        setPonds(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(
          error.message ||
            "Có lỗi khi lấy dữ liệu, vui lòng thử lại sau ít phút!",
        );
      } finally {
        setIsLoading(false);
      }
    };
    getAllPondsByCustomer();
  }, []);

  const filteredPonds = ponds.filter((pond: any) => {
    const searchValue = removeVietnameseTones(searchText.toLowerCase());
    const pondId = removeVietnameseTones(pond.recordId.toLowerCase());

    return (
      pondId.includes(searchValue) || pond.pondSize.toString() === searchText
    );
  });

  if (isLoading) {
    return (
      <div className="section flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="section">
      <HeaderPage
        heading="Danh sách báo cáo"
        placeholder="Tìm báo cáo hồ (Mã báo cáo, kích thước hồ)"
        alt="Tìm báo cáo hồ (Mã báo cáo, kích thước hồ)"
        onSearch={handleSearch}
      />
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
        {filteredPonds ? (
          filteredPonds.map((pond: any, i) => (
            <Card
              key={i}
              className="duration-100 ease-in hover:border-[#4096ff]"
            >
              <div className="flex w-full">
                <div className="flex flex-1 flex-col gap-2">
                  <p>
                    <span className="font-semibold">Mã báo cáo: </span>
                    {pond.recordId}
                  </p>
                  <p>
                    <span className="font-semibold">Kích cỡ hồ: </span>
                    {pond.pondSize} (L)
                  </p>
                  <p>
                    <span className="font-semibold">Tình trạng: </span>
                    {pond.status}
                  </p>
                  <p>
                    <span className="font-semibold">Ngày khảo sát: </span>
                    {new Date(pond.createAt).toLocaleDateString()}
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
            </Card>
          ))
        ) : (
          <Empty
            className="mt-20"
            imageStyle={{ height: 200 }}
            description="Không tìm thấy hồ sơ nào"
          />
        )}
      </div>
    </div>
  );
};

export default ListPonds;
