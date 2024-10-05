import {
  Avatar,
  Button,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  SelectProps,
  Spin,
} from "antd";
import { User } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";

import VietNameProvinces from "../../../data/index";
import { CustomerData } from "../../models/DataModels";
import { uploadFile } from "../../utils";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const [file, setFile] = useState(null);
  const inpRef = useRef<any>();

  const [city, setCity] = useState<String>("");
  const [district, setDistrict] = useState<String>("");
  const [ward, setWard] = useState<String>("");

  const [cities, setCities] = useState<SelectProps["options"]>([]);
  const [districts, setDistricts] = useState<SelectProps["options"]>([]);
  const [wards, setWards] = useState<SelectProps["options"]>([]);
  const [profile, setProfile] = useState<CustomerData | null>(null);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoadingForm(true);
      if (file) {
        values.photoUrl = await uploadFile(file, "customer");
      }
      console.log(values);
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    } finally {
      setIsLoadingForm(false);
    }
  };

  const [form] = Form.useForm();

  useEffect(() => {
    const res = VietNameProvinces.map((item: any) => ({
      value: item.Name,
      label: item.Name,
    }));
    setCities(res);
  }, []);

  useEffect(() => {
    const res = VietNameProvinces.find((item: any) => item.Name === city);
    const res1 = res?.Districts?.map((item: any) => ({
      value: item.Name,
      label: item.Name,
    }));
    setDistricts(res1);

    if (form.getFieldValue(["district"])) {
      form.setFieldValue("district", "");
      form.setFieldValue("ward", "");
    }
  }, [city]);

  useEffect(() => {
    const res = VietNameProvinces.find((item: any) => item.Name === city);
    const res1 = res?.Districts.find((item: any) => item.Name === district);
    const res2 = res1?.Wards.map((item: any) => ({
      value: item.Name,
      label: item.Name,
    }));
    setWards(res2);

    if (form.getFieldValue(["ward"])) {
      form.setFieldValue("ward", "");
    }
  }, [district]);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setIsLoading(true);
        const api = `api/users/`;
        const res = await handleAPI(api, undefined, "GET");
        setProfile(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-115px)] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

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
        <div className="mx-32">
          <div className="my-10 flex w-fit items-center gap-10">
            <label htmlFor="inpFile">
              {file ? (
                <Avatar
                  shape="square"
                  style={{ backgroundColor: "transparent", border: "2px dashed #ccc" }}
                  size={100}
                  src={URL.createObjectURL(file)}
                  icon={
                    <User
                      color="#ccc"
                      size={30}
                    />
                  }
                />
              ) : (
                <Avatar
                  shape="square"
                  style={{ backgroundColor: "transparent", border: "2px dashed #ccc" }}
                  size={100}
                  src={profile?.photoUrl}
                  icon={
                    <User
                      color="#ccc"
                      size={30}
                    />
                  }
                />
              )}
            </label>
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
        <div className="mx-32">
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
        <div className="mx-32">
          <Form
            disabled={isLoadingForm}
            form={form}
            size="large"
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Row gutter={32}>
              <Col span={10}>
                <Form.Item
                  name="email"
                  label="Email"
                >
                  <Input
                    defaultValue={profile?.email}
                    readOnly
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  name="username"
                  label="Tên tài khoản"
                >
                  <Input defaultValue={profile?.username} />
                </Form.Item>
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      name="fullName"
                      label="Họ và tên"
                    >
                      <Input
                        placeholder="Họ và tên"
                        defaultValue={profile?.fullName}
                      />
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
                        defaultValue={profile?.phoneNumber}
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
                        defaultValue={profile?.gender ? "Nam" : "Nữ"}
                        options={[
                          { value: 0, label: "Nữ" },
                          { value: 1, label: "Nam" },
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
                        defaultValue={profile?.city}
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
                        defaultValue={profile?.district}
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
                        defaultValue={profile?.ward}
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
                      <Input
                        placeholder="Địa chỉ"
                        defaultValue={profile?.detailAddress}
                      />
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
                  loading={isLoadingForm}
                  size="large"
                  type="primary"
                  className="mt-3 w-fit"
                  onClick={() => form.submit()}
                >
                  Cập nhật
                </Button>
              </ConfigProvider>
            </div>
          </Form>
        </div>

        {/* Upload file */}
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
    </div>
  );
};

export default Profile;
