import {
  Avatar,
  Button,
  Card,
  ConfigProvider,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Select,
  Spin,
  Tag,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";
import { useSelector } from "react-redux";
import { IAuth } from "../../types";
import { getValue, uploadFile } from "../../utils";
import { Link } from "react-router-dom";
import { HeaderComponent } from "../../components";
import { GiCirclingFish } from "react-icons/gi";

const { TextArea } = Input;

const MedicalRecord = () => {
  const inpRef = useRef<any>();
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fishes, setFishes] = useState<any>([]);
  const [selectedFish, setSelectedFish] = useState<any>(null);
  const [isFishModalOpen, setIsFishModalOpen] = useState<boolean>(false);
  const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false);

  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  const handleOpenFishModal = async (fish: any) => {
    try {
      form.setFieldsValue(fish);
      setSelectedFish(fish);
      setIsFishModalOpen(true);
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    }
  };

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

  const handleFishSubmit = async (values: any) => {
    try {
      setIsLoadingForm(true);
      let api = `/api/fishes/${selectedFish._id}`;

      if (file) {
        values.photoUrl = await uploadFile(file, "fishes");
      }

      const res: any = await handleAPI(api, values, "PATCH");

      if (res.data) {
        setFishes(fishes.map((fish: any) => (fish._id === selectedFish._id ? res.data : fish)));
      }

      message.success(res.message);
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    } finally {
      setIsLoadingForm(false);
      setIsFishModalOpen(false);
      form.resetFields();
    }
  };

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
      <div className="my-account-section">
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
                  <div className="flex w-1/5 flex-col items-end gap-2">
                    <Link to={`/my-account/medical-record/fishes/${fish._id}/records`}>
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
        <Modal
          okText="Cập nhật"
          cancelText="Hủy"
          open={isFishModalOpen}
          onCancel={() => setIsFishModalOpen(false)}
          style={{ top: 30 }}
          onOk={() => form.submit()}
        >
          <div className="mt-3">
            <h3 className="heading-4 mb-3">Cập nhật thông tin cá</h3>
            <Form
              disabled={isLoadingForm}
              form={form}
              size="large"
              layout="vertical"
              onFinish={handleFishSubmit}
            >
              <Form.Item name="photoUrl">
                <label
                  htmlFor="inpFile"
                  className="flex justify-center"
                >
                  {file ? (
                    <Avatar
                      shape="square"
                      style={{
                        backgroundColor: "transparent",
                        border: "2px dashed #ccc",
                      }}
                      icon={<GiCirclingFish color="#ccc" />}
                      src={URL.createObjectURL(file)}
                      size={130}
                    />
                  ) : (
                    <Avatar
                      shape="square"
                      style={{
                        backgroundColor: "transparent",
                        border: "2px dashed #ccc",
                        margin: "0px auto",
                      }}
                      icon={<GiCirclingFish color="#ccc" />}
                      src={selectedFish?.photoUrl}
                      size={130}
                    />
                  )}
                </label>
              </Form.Item>
              <Divider />
              <Form.Item
                name="size"
                label="Kích thước (cm)"
                required
              >
                <Input
                  min={0}
                  type="number"
                  placeholder="Nhập kích thước"
                />
              </Form.Item>
              <Form.Item
                name="age"
                label="Tuổi"
                required
              >
                <Input
                  min={1}
                  type="number"
                  placeholder="Nhập tuổi"
                />
              </Form.Item>
              <Form.Item
                name="gender"
                label="Giới tính"
                required
              >
                <Select
                  placeholder="Chọn giới tính"
                  options={[
                    { value: "đực", label: "Đực" },
                    { value: "cái", label: "Cái" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="description"
                label="Mô tả"
                required
              >
                <TextArea
                  placeholder="Nhập mô tả"
                  rows={2}
                />
              </Form.Item>
            </Form>
          </div>
        </Modal>
        <div className="hidden">
          <input
            ref={inpRef}
            type="file"
            accept="image/*"
            id="inpFile"
            onChange={(e: any) => setFile(e.target.files[0])}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default MedicalRecord;
