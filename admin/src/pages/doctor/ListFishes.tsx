import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  ConfigProvider,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Select,
  Tag,
} from "antd";
import { Stickynote } from "iconsax-react";
import { Link, useLocation } from "react-router-dom";
import { getValue } from "../../utils";
import { HeaderPage } from "../../components";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";
import { GiCirclingFish } from "react-icons/gi";

const { TextArea } = Input;

const ListFishes = () => {
  const { pathname } = useLocation();
  const customerId = pathname.split("/")[3];
  const [fishes, setFishes] = useState([]);

  const [form] = Form.useForm();

  const [isFishModalOpen, setIsFishModalOpen] = useState<boolean>(false);

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

  const handleOpenFishModal = async (fish: any) => {
    try {
      form.setFieldsValue(fish);
      setIsFishModalOpen(true);
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    }
  };

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
                <div className="flex w-1/5 flex-col items-end gap-2">
                  <Link
                    to={`/doctor/customers/${customerId}/fishes/${fish._id}/records`}
                  >
                    <Button type="primary">Xem chi tiết</Button>
                  </Link>
                  <Button
                    style={{ width: "fit-content" }}
                    onClick={() => handleOpenFishModal(fish)}
                  >
                    Chỉnh sửa
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 15,
            },
          },
        }}
      >
        <Modal
          okText="Cập nhật"
          cancelText="Hủy"
          open={isFishModalOpen}
          onCancel={() => setIsFishModalOpen(false)}
          style={{ top: 30 }}
        >
          <div className="mt-3">
            <h3 className="heading-4 mb-3">Cập nhật thông tin cá</h3>
            <Form form={form} size="large" layout="vertical">
              <div className="text-center">
                <Avatar
                  shape="square"
                  style={{
                    backgroundColor: "transparent",
                    border: "2px dashed #ccc",
                    margin: "0px auto",
                  }}
                  icon={<GiCirclingFish color="#ccc" />}
                  size={130}
                />
              </div>
              <Divider />
              <Form.Item name="size" label="Kích thước (cm)" required>
                <Input min={0} type="number" placeholder="Nhập kích thước" />
              </Form.Item>
              <Form.Item name="age" label="Tuổi" required>
                <Input min={1} type="number" placeholder="Nhập tuổi" />
              </Form.Item>
              <Form.Item name="gender" label="Giới tính" required>
                <Select
                  placeholder="Chọn giới tính"
                  options={[
                    { value: "đực", label: "Đực" },
                    { value: "cái", label: "Cái" },
                  ]}
                />
              </Form.Item>
              <Form.Item name="description" label="Mô tả" required>
                <TextArea placeholder="Nhập mô tả" rows={2} />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default ListFishes;
