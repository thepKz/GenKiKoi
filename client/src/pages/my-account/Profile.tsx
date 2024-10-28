import {
  Alert,
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

import VietNamProvinces from "../../../data/index";
import { uploadFile } from "../../utils";
import { IAuth, ICustomerData } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { updateAuth } from "../../redux/reducers/authReducer";
import { HeaderComponent } from "../../components";

const Profile = () => {
  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  const dispatch = useDispatch();

  const inpRef = useRef<any>();

  const [file, setFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const [city, setCity] = useState<String>("");
  const [district, setDistrict] = useState<String>("");
  const [ward, setWard] = useState<String>("");

  const [cities, setCities] = useState<SelectProps["options"]>([]);
  const [districts, setDistricts] = useState<SelectProps["options"]>([]);
  const [wards, setWards] = useState<SelectProps["options"]>([]);

  const [profile, setProfile] = useState<ICustomerData | null>(null);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoadingForm(true);

      const api = `/api/users/update-profile`;

      if (file) {
        values.photoUrl = await uploadFile(file, "customers");
      }

      const res: any = await handleAPI(api, values, "PATCH");

      dispatch(updateAuth(res.data));

      message.success(res.message);
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    } finally {
      setIsLoadingForm(false);
    }
  };

  const [form] = Form.useForm();

  useEffect(() => {
    const res = VietNamProvinces.map((item: any) => ({
      value: item.Name,
      label: item.Name,
    }));
    setCities(res);
  }, []);

  useEffect(() => {
    const res = VietNamProvinces.find((item: any) => item.Name === city);
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
    const res = VietNamProvinces.find((item: any) => item.Name === city);
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
        const api = `/api/users/`;
        const res = await handleAPI(api, undefined, "GET");
        setProfile(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        email: profile.email,
        username: profile.username,
        fullName: profile.fullName,
        phoneNumber: profile.phoneNumber,
        gender: profile.gender,
        city: profile.city,
        district: profile.district,
        ward: profile.ward,
        detailAddress: profile.detailAddress,
      });
    }
  }, [profile]);

  const handleCheckExistence = async (field: string, value: string) => {
    const api = `/api/auth/check-${field}`;
    try {
      const res: any = await handleAPI(api, { [field]: value }, "POST");

      if (res.exists && res.userId !== auth.id) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }

  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-115px)] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        inherit: false,
        token: {
          fontFamily: "Pro-Rounded",
        },
        components: {
          Divider: {
            marginLG: 15,
          },
        },
      }}
    >
      <div className="my-account-section">
        {/* Header */}
        <HeaderComponent heading="Hồ sơ cá nhân" />
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
        <div className="mx-32 mb-3">
          <Divider />
          <Alert
            message="Quý khách phải cập nhật những thông tin bắt buộc (*) thì mới có thể đặt được cuộc hẹn!"
            type="warning"
            showIcon
          />
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
            <div className="flex h-[calc(100vh-400px)] flex-col justify-between">
              <Row gutter={32}>
                <Col span={10}>
                  <Form.Item
                    name="email"
                    label="Email"
                  >
                    <Input
                      placeholder="Email"
                      readOnly
                      disabled
                    />
                  </Form.Item>
                  <Form.Item
                    name="username"
                    label="Tên tài khoản"
                    hasFeedback
                    tooltip="Tên tài khoản phải bao gồm chữ thường, in hoa, số và có thể có dấu _!"
                    rules={[
                      { required: true, message: "Vui lòng nhập tên tài khoản" },
                      {
                        validator: async (_, value) => {
                          if (value.trim().length < 8 || value.trim().length > 30) {
                            return Promise.reject(
                              new Error("Tên tài khoản phải có độ dài từ 8 đến 30 ký tự!"),
                            );
                          }
                          if (!/^(?=.*[a-z])(?=.*\d)[a-zA-Z0-9_]+$/.test(value)) {
                            return Promise.reject(
                              new Error(
                                "Tên tài khoản phải bao gồm chữ thường, số và có thể có dấu _!",
                              ),
                            );
                          }

                          const exists = await handleCheckExistence("username", value);
                          if (exists) {
                            return Promise.reject(new Error("Tên tài khoản đã tồn tại!")); // Thêm dòng này
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}
                    validateDebounce={1000}
                  >
                    <Input placeholder="Tên tài khoản" />
                  </Form.Item>
                  <Row gutter={24}>
                    <Col span={24}>
                      <Form.Item
                        name="fullName"
                        label="Họ và tên"
                        hasFeedback
                        tooltip="Chỉ chữ cái và khoảng trắng, dài từ 2 đến 50 ký tự!"
                        rules={[
                          { required: true, message: "Vui lòng nhập họ và tên" },
                          { min: 2, message: "Họ và tên phải có ít nhất 2 ký tự" },
                          { max: 50, message: "Họ và tên không được vượt quá 50 ký tự" },
                          {
                            pattern: /^[a-zA-ZÀ-ỹ\s]+$/,
                            message: "Họ và tên chỉ được chứa chữ cái và khoảng trắng",
                          },
                          {
                            validator: (_, value) => {
                              if (value && value.trim().split(/\s+/).length < 2) {
                                return Promise.reject("Họ và tên phải bao gồm ít nhất hai từ");
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                        validateDebounce={1000}
                      >
                        <Input placeholder="Họ và tên" />
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
                        hasFeedback
                        rules={[
                          { required: true, message: "Vui lòng nhập số điện thoại" },
                          { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ" },
                        ]}
                        validateDebounce={1000}
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
                        rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
                      >
                        <Select
                          placeholder="Giới tính"
                          options={[
                            { value: "nam", label: "Nam" },
                            { value: "nữ", label: "Nữ" },
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
                        name="detailAddress"
                        label="Địa chỉ"
                      >
                        <Input placeholder="Địa chỉ" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <div className="text-right">
                <Button
                  loading={isLoadingForm}
                  size="large"
                  type="primary"
                  className="mt-3 w-fit"
                  onClick={() => form.submit()}
                >
                  Cập nhật
                </Button>
              </div>
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
    </ConfigProvider>
  );
};

export default Profile;
