import {
  Avatar,
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Spin,
} from "antd";
import { HeaderPage } from "../../components";
import { User } from "iconsax-react";

import { useEffect, useRef, useState } from "react";
import { IAuth } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { handleAPI } from "../../apis/handleAPI";
import { uploadFile } from "../../utils";
import { updateAuth } from "../../redux/reducers/authReducer";

const Profile = () => {
  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  const [form] = Form.useForm();
  const inpRef = useRef<any>();

  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setIsLoading(true);
        const api = `/api/staffs/${auth.adminId}`;
        const res = await handleAPI(api, undefined, "GET");

        setProfile(res.data);
      } catch (error) {
        message.error("Có lỗi khi lấy thông tin nhân viên");
      } finally {
        setIsLoading(false);
      }
    };
    getProfile();
  }, [auth.adminId]);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue(profile);
    }
  }, [profile]);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoadingForm(true);
      const api = `/api/staffs/${auth.adminId}`;
      if (file) {
        values.photoUrl = await uploadFile(file, "staffs");
      }
      const res: any = await handleAPI(api, values, "PATCH");
      dispatch(updateAuth({ photoUrl: res.data.photoUrl }));

      message.success(res.message);
    } catch (error) {
      console.log(error);
      message.error("Có lỗi xảy ra khi cập nhật thông tin");
    } finally {
      setIsLoadingForm(false);
    }
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <div className="section">
      <HeaderPage heading="Hồ sơ cá nhân" />
      <Row gutter={32} justify="center">
        <div className="flex items-center gap-10">
          <div className="">
            <label htmlFor="inpFile">
              {file ? (
                <Avatar
                  shape="square"
                  style={{
                    backgroundColor: "transparent",
                    border: "2px dashed #ccc",
                  }}
                  size={150}
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
                  size={150}
                  src={profile?.photoUrl}
                  icon={<User color="#ccc" size={50} />}
                />
              )}
            </label>
          </div>
          <div className="">
            <h3 className="text-lg font-semibold">Image requirements:</h3>
            <ol className="">
              <li>1. Min. 400 x 400px</li>
              <li>2. Max. 2MB</li>
            </ol>
          </div>
        </div>
      </Row>
      <div className="flex h-[calc(100vh-310px)] flex-col justify-between">
        <div className="mx-24">
          <Divider />
          <Form
            form={form}
            onFinish={handleSubmit}
            disabled={isLoadingForm}
            size="large"
            layout="vertical"
          >
            <Row gutter={32}>
              <Col span={12}>
                <Form.Item name="email" label="Email" required>
                  <Input disabled allowClear placeholder="Nhập email" />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
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
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      rules={[
                        { required: true, message: "Vui lòng chọn giới tính" },
                      ]}
                      name="gender"
                      label="Giới tính"
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
                      pattern: /^[0-9]{10}$/,
                      message: "Số điện thoại không hợp lệ",
                    },
                  ]}
                  validateDebounce={1000}
                >
                  <Input addonBefore="+84" placeholder="Số điện thoại" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="position" label="Vị trí">
                  <Select
                    placeholder="Vị trí"
                    disabled
                    options={[
                      {
                        value: "Hỗ trợ khách hàng",
                        label: "Hỗ trợ khách hàng",
                      },
                      { value: "Tiếp tân", label: "Tiếp tân" },
                      { value: "Trợ lý", label: "Trợ lý" },
                      { value: "Thu ngân", label: "Thu ngân" },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn ca làm",
                    },
                  ]}
                  name="workShift"
                  label="Ca làm"
                >
                  <Select
                    placeholder="Ca làm"
                    options={[
                      { value: "Morning", label: "Ca sáng" },
                      { value: "Afternoon", label: "Ca chiều" },
                      { value: "Night", label: "Ca tối" },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="mx-24 text-right">
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
  );
};

export default Profile;
