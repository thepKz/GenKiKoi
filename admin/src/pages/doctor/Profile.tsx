import {
  Alert,
  Avatar,
  Button,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { User } from "iconsax-react";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

import { useEffect, useRef, useState } from "react";
import { HeaderPage } from "../../components";
import { uploadFile } from "../../utils";
import { handleAPI } from "../../apis/handleAPI";
import { useDispatch, useSelector } from "react-redux";
import { IAuth } from "../../types";
import { updateAuth } from "../../redux/reducers/authReducer";

const Profile = () => {
  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const inpRef = useRef<any>();

  const [file, setFile] = useState(null);

  const [profile, setProfile] = useState<any>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setIsLoading(true);
        const api = `/api/doctors/${auth.adminId}`;

        const res = await handleAPI(api, undefined, "GET");

        setProfile(res.data);

        form.setFieldsValue(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      }
    };
    getProfile();
  }, []);

  const handleUpload: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Bạn chỉ có thể tải lên file JPG/PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Hình ảnh phải nhỏ hơn 2MB!");
    }
    return false;
  };

  const handleSubmit = async (values: any) => {
    try {
      setIsLoadingForm(true);
      const api = `/api/doctors/${auth.adminId}`;
      if (fileList.length > 0) {
        const uploadedFiles = await Promise.all(
          fileList.map(async (file) => {
            if (file.originFileObj) {
              const url = await uploadFile(file.originFileObj, "doctors");
              return url;
            }
            return null;
          }),
        );
        values.images = uploadedFiles.filter((file) => file !== null);
      }

      if (file) {
        values.photoUrl = await uploadFile(file, "doctors");
      }

      const res: any = await handleAPI(api, values, "PATCH");

      dispatch(updateAuth({ photoUrl: res.data.photoUrl }));
      message.success(res.message);
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    } finally {
      setIsLoadingForm(false);
    }
  };

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
              <Divider />
              <div className="">
                <h4 className="mb-2 text-base font-semibold">
                  Upload hình ảnh chứng chỉ
                </h4>

                <Alert
                  message="Giấy phép phải được cấp bởi các cơ quan được bộ y tế cấp
                    phép!"
                  type="warning"
                  showIcon
                />
                <div className="mt-3">
                  <Form.Item>
                    <Upload
                      accept="image/png, image/jpeg"
                      fileList={fileList}
                      beforeUpload={beforeUpload}
                      onChange={handleUpload}
                      maxCount={4}
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </Form.Item>
                </div>
              </div>
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
                  <Col span={6}>
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
                  <Col span={6}>
                    <Form.Item name="specialization" label="Chứng chỉ" required>
                      <Input placeholder="Tên chứng chỉ" />
                    </Form.Item>
                    <Form.Item
                      name="licenseNumber"
                      label="Mã số chứng chỉ"
                      required
                    >
                      <Input placeholder="Mã số chứng chỉ" />
                    </Form.Item>
                    <Form.Item
                      name="movingService"
                      label="Dịch vụ di động"
                      required
                    >
                      <Select
                        placeholder="Chọn dịch vụ di động"
                        options={[
                          { value: true, label: "Có" },
                          { value: false, label: "Không" },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      name="yearOfExperience"
                      label="Năm kinh nghiệm"
                      required
                    >
                      <InputNumber
                        min={0}
                        max={50}
                        style={{ width: "100%" }}
                        placeholder="Số năm kinh nghiệm"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="introduction"
                      tooltip="Hãy giới thiệu một các đầy đủ rõ ràng về bản thân của mình!"
                      label="Giới thiệu"
                    >
                      <TextArea
                        placeholder="Giới thiệu về bản thân"
                        rows={16}
                      />
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
