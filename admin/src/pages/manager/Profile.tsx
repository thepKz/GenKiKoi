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
  Spin,
} from "antd";
import { KeySquare, User } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleAPI } from "../../apis/handleAPI";
import { HeaderPage } from "../../components";
import { updateAuth } from "../../redux/reducers/authReducer";
import { IAuth } from "../../types";
import { uploadFile } from "../../utils";

const Profile = () => {
  const auth: IAuth = useSelector((state: any) => state.authReducer.data);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const inpRef = useRef<any>();

  const [file, setFile] = useState(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setIsLoading(true);
        const api = `/api/managers/${auth.adminId}`;
        const res = await handleAPI(api, undefined, "GET");
        setProfile(res.data);
        form.setFieldsValue(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getProfile();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoadingForm(true);
      const api = `/api/managers/${auth.adminId}`;

      if (file) {
        values.photoUrl = await uploadFile(file, "managers");
      }

      const res: any = await handleAPI(api, values, "PATCH");
      dispatch(updateAuth({ photoUrl: res.data.photoUrl }));
      message.success("Cập nhật thông tin thành công!");
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleCheckExistence = async (field: string, value: string) => {
    const api = `/api/users/check-${field}`;
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
      <div className="section flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            itemMarginBottom: 10,
          },
        },
      }}
    >
      <div className="section">
        <HeaderPage heading="Hồ sơ cá nhân" />
        <div className="flex h-[calc(100vh-150px)] flex-col justify-between">
          <Row gutter={32}>
            <Col span={6}>
              <div className="my-5 mb-10 text-center">
                <label htmlFor="inpFile">
                  {file ? (
                    <Avatar
                      shape="square"
                      style={{
                        backgroundColor: "transparent",
                        border: "2px dashed #ccc",
                      }}
                      size={200}
                      src={URL.createObjectURL(file)}
                      icon={<User color="#ccc" size={50} />}
                    />
                  ) : (
                    <Avatar
                      shape="square"
                      style={{
                        backgroundColor: "transparent",
                        border: "2px dashed #ccc",
                      }}
                      size={200}
                      src={profile?.photoUrl}
                      icon={<User color="#ccc" size={50} />}
                    />
                  )}
                </label>
              </div>
              <Divider />
              <Link to="/manager/change-password">
                <Button size="large" className="w-full">
                  <KeySquare />
                  Thay đổi mật khẩu ở đây!
                </Button>
              </Link>
            </Col>
            <Col span={18}>
              <Form
                form={form}
                size="large"
                layout="vertical"
                onFinish={handleSubmit}
                disabled={isLoadingForm}
              >
                <Row gutter={32}>
                  <Col span={12}>
                    <Form.Item name="email" label="Email" required>
                      <Input disabled allowClear placeholder="Nhập email" />
                    </Form.Item>
                    <Form.Item
                      name="fullName"
                      label="Họ và tên"
                      hasFeedback
                      tooltip="Chỉ chữ cái và khoảng trắng, dài từ 2 đến 50 ký tự!"
                      rules={[
                        { required: true, message: "Vui lòng nhập họ và tên" },
                        {
                          min: 2,
                          message: "Họ và tên phải có ít nhất 2 ký tự",
                        },
                        {
                          max: 50,
                          message: "Họ và tên không được vượt quá 50 ký tự",
                        },
                        {
                          pattern: /^[a-zA-ZÀ-ỹ\s]+$/,
                          message:
                            "Họ và tên chỉ được chứa chữ cái và khoảng trắng",
                        },
                        {
                          validator: (_, value) => {
                            if (value && value.trim().split(/\s+/).length < 2) {
                              return Promise.reject(
                                "Họ và tên phải bao gồm ít nhất hai từ",
                              );
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                      validateDebounce={1000}
                    >
                      <Input placeholder="Họ và tên" />
                    </Form.Item>
                    <Row gutter={24}>
                      <Col span={14}>
                        <Form.Item
                          name="phoneNumber"
                          label="Số điện thoại"
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập số điện thoại",
                            },
                            {
                              pattern: /^(0[3|5|7|8|9])+([0-9]{8})\b/,
                              message: "Số điện thoại không hợp lệ",
                            },
                            {
                              validator: async (_, value) => {
                                if (value && value.trim().length > 0) {
                                  const exists = await handleCheckExistence(
                                    "phoneNumber",
                                    value,
                                  );

                                  if (exists) {
                                    return Promise.reject(
                                      new Error(
                                        "Số điện thoại này đã được đăng ký!",
                                      ),
                                    );
                                  }
                                }
                                return Promise.resolve();
                              },
                            },
                          ]}
                          validateDebounce={1000}
                        >
                          <Input
                            addonBefore={
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 30 20"
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                              >
                                <rect
                                  width="30"
                                  height="20"
                                  fill="#da251d"
                                  rx={3}
                                />
                                <polygon
                                  points="15,4 11.47,14.85 20.71,8.15 9.29,8.15 18.53,14.85"
                                  fill="#ff0"
                                />
                              </svg>
                            }
                            placeholder="Số điện thoại"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          name="gender"
                          label="Giới tính"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng chọn giới tính",
                            },
                          ]}
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
                  </Col>
                  <Col span={12}>
                    <Form.Item name="position" label="Vị trí">
                      <Input disabled placeholder="Vị trí" />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <div className="text-right">
            <Button
              size="large"
              loading={isLoadingForm}
              type="primary"
              className="mt-3 w-fit"
              onClick={() => form.submit()}
            >
              Cập nhật
            </Button>
          </div>
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