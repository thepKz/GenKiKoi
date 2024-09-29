import {
  Avatar,
  Button,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Row,
  Select,
  SelectProps,
} from "antd";
import { User } from "iconsax-react";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";

const Profile = () => {
  const [data, setData] = useState<any>(null);
  const [city, setCity] = useState<String>("");
  const [district, setDistrict] = useState<String>("");
  const [ward, setWard] = useState<String>("");
  const [cities, setCities] = useState<SelectProps["options"]>([]);
  const [districts, setDistricts] = useState<SelectProps["options"]>([]);
  const [wards, setWards] = useState<SelectProps["options"]>([]);

  const [form] = Form.useForm();

  useEffect(() => {
    const getData = async () => {
      const api = "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json";
      const res: any = await handleAPI(api, undefined, "GET");
      setData(res);
    };
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      const res = data?.map((item: any) => ({
        value: item.Name,
        label: item.Name,
      }));
      setCities(res);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const res = data.find((item: any) => item.Name === city);
      const res1 = res?.Districts?.map((item: any) => ({
        value: item.Name,
        label: item.Name,
      }));
      setDistricts(res1);
    }
    if (form.getFieldValue(["district"])) {
      form.setFieldValue("district", "");
      form.setFieldValue("ward", "");
    }
  }, [city]);

  useEffect(() => {
    if (data) {
      const res = data.find((item: any) => item.Name === city);
      const res1 = res?.Districts.find((item: any) => item.Name === district);
      const res2 = res1?.Wards.map((item: any) => ({
        value: item.Name,
        label: item.Name,
      }));
      setWards(res2);
    }
    if (form.getFieldValue(["ward"])) {
      form.setFieldValue("ward", "");
    }
  }, [district]);

  return (
    <div>
      <div className="container mx-auto my-5 h-[calc(100vh-115px)] rounded-md bg-white p-5 shadow-sm lg:w-[95%]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="heading-3">Hồ sơ cá nhân</h1>
        </div>
        {/* Divider */}
        <ConfigProvider
          theme={{
            components: {
              Divider: {
                marginLG: 15,
              },
            },
          }}
        >
          <Divider />
        </ConfigProvider>
        {/* My Profile */}
        <div className="mx-20">
          <div className="my-10 flex w-fit items-center gap-10">
            <Avatar
              shape="square"
              style={{ backgroundColor: "transparent", border: "2px dashed #ccc" }}
              size={100}
              icon={
                <User
                  color="#ccc"
                  size={30}
                />
              }
            />
            <div className="">
              <h3 className="text-lg font-semibold">Image requirements:</h3>
              <ol className="">
                <li>1. Min. 400 x 400px</li>
                <li>2. Max. 2MB</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-20">
          <ConfigProvider
            theme={{
              components: {
                Divider: {
                  marginLG: 15,
                  lineWidth: 2,
                },
              },
            }}
          >
            <Divider />
          </ConfigProvider>
        </div>

        {/* Profile detail */}
        <div className="mx-20">
          <Form
            form={form}
            size="large"
            layout="vertical"
          >
            <Row gutter={32}>
              <Col span={10}>
                <Form.Item
                  name="email"
                  label="Email"
                >
                  <Input
                    defaultValue="doquangdung1782004@gmail.com"
                    readOnly
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  name="username"
                  label="Tên tài khoản"
                >
                  <Input defaultValue="QuangDung2k4" />
                </Form.Item>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      name="lastName"
                      label="Họ"
                    >
                      <Input placeholder="Họ" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="fistName"
                      label="Tên"
                    >
                      <Input placeholder="Tên" />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={14}>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      name="phoneNumber"
                      label="Số điện thoại"
                    >
                      <Input
                        addonBefore="+84"
                        placeholder="Số điện thoại"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="gender"
                      label="Giới tính"
                    >
                      <Select
                        placeholder="Giới tính"
                        options={[
                          { value: "female", label: "Nữ" },
                          { value: "male", label: "Nam" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                      name="city"
                      label="Tỉnh"
                    >
                      <Select
                        placeholder="Thành phố"
                        value={city}
                        onChange={(e) => {
                          setCity(e);
                        }}
                        options={cities}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="district"
                      label="Quận / Huyện"
                    >
                      <Select
                        placeholder="Quận / Huyện"
                        onChange={(e) => {
                          setDistrict(e);
                        }}
                        options={districts}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="ward"
                      label="Phường / Xã"
                    >
                      <Select
                        placeholder="Phường / Xã"
                        value={ward}
                        onChange={(e) => setWard(e)}
                        options={wards}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="address"
                      label="Địa chỉ"
                    >
                      <Input placeholder="Địa chỉ" />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>

            <div className="text-right">
              <ConfigProvider
                theme={{
                  inherit: false,
                  token: {
                    fontFamily: "Pro-Rounded",
                  },
                }}
              >
                <Button
                  size="large"
                  type="primary"
                  className="mt-3 w-fit"
                >
                  Cập nhật
                </Button>
              </ConfigProvider>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
