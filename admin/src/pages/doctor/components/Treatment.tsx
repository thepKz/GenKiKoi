import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  List,
  message,
  Row,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { medicines } from "../../../constants";
import { AiOutlineDelete } from "react-icons/ai";
import { QuantityButton } from "../../../share";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { handleAPI } from "../../../apis/handleAPI";
import { uploadFile } from "../../../utils";
import { useSelector } from "react-redux";
import { IAuth } from "../../../types";

const { TextArea } = Input;

const Treatment = () => {
  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  const [form] = useForm();
  const [selectedMedicines, setSelectedMedicines] = useState<any>([]);
  const [services, setServices] = useState([]);
  const [fishRecords, setFishRecords] = useState([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      if (fileList.length > 0) {
        const uploadedFiles = await Promise.all(
          fileList.map(async (file) => {
            if (file.originFileObj) {
              const url = await uploadFile(file.originFileObj, "records");
              return url;
            }
            return null;
          }),
        );
        values.images = uploadedFiles.filter((file) => file !== null);
      }

      if (selectedMedicines.length > 0) {
        values.medicines = selectedMedicines;
      }

      values.doctorId = auth.adminId;

      const api = `/api/medicalRecords/`;
      const res: any = await handleAPI(api, values, "POST");

      message.success(res.message);
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addMedicine = (medicine: any) => {
    setSelectedMedicines([
      ...selectedMedicines,
      { name: medicine, quantity: 1 },
    ]);
  };

  const updateMedicineQuantity = (index: number, newQuantity: number) => {
    const updatedMedicines = selectedMedicines.map(
      (med: { name: string; quantity: number }, i: number) =>
        i === index ? { ...med, quantity: newQuantity } : med,
    );
    setSelectedMedicines(updatedMedicines);
  };

  const removeMedicine = (index: number) => {
    setSelectedMedicines(
      selectedMedicines.filter(
        (_med: { name: string; quantity: number }, i: number) => i !== index,
      ),
    );
  };

  useEffect(() => {
    const getAllServices = async () => {
      try {
        const api = `/api/services/`;
        const res = await handleAPI(api, undefined, "GET");
        console.log(res.data);
        setServices(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      }
    };
    getAllServices();
  }, []);

  const getFishRecordByPhoneNumber = async (phoneNumber: any) => {
    try {
      setFishRecords([]);
      const api = `/api/fishes/customers/${phoneNumber}`;
      const res = await handleAPI(api, undefined, "GET");

      if (res.data) {
        setFishRecords(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    return false; // Ngăn chặn tự động upload
  };

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Form: {
              marginLG: 16,
            },
          },
        }}
      >
        <div className="flex h-[calc(100vh-210px)] flex-col justify-between">
          <Form
            onFinish={handleSubmit}
            disabled={isLoading}
            form={form}
            layout="vertical"
            size="large"
          >
            <Row gutter={24}>
              <Col span={6}>
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
                      validator: async (_, value) => {
                        if (value) {
                          await getFishRecordByPhoneNumber(value);
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                  validateDebounce={1000}
                >
                  <Input placeholder="Số điện thoại" />
                </Form.Item>
                <Form.Item
                  name="fishId"
                  label="Danh sách hồ sơ"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn hồ sơ",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn hồ sơ"
                    style={{ width: "100%" }}
                    options={[
                      {
                        value: "newRecord",
                        label: "Hồ sơ mới",
                      },
                      ...(fishRecords.length > 0
                        ? fishRecords.map((record: any) => ({
                            value: record.id,
                            label: record.description,
                          }))
                        : []),
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  name="serviceName"
                  label="Dịch vụ"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn loại dịch vụ",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn loại dịch vụ"
                    style={{ width: "100%" }}
                    options={services.map((service: any) => ({
                      value: service.serviceName,
                      label: service.serviceName,
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  name="examType"
                  label="Khám bệnh / Tái khám"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn hình thức khám bệnh",
                    },
                  ]}
                >
                  <Select
                    placeholder="Khám bệnh / Tái khám"
                    options={[
                      {
                        value: "Khám bệnh",
                        label: "Khám bệnh",
                      },
                      {
                        value: "Tái khám",
                        label: "Tái khám",
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label="Hình ảnh"
                  tooltip="Chỉ tải lên được tối đa 4 hình ảnh"
                >
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
              </Col>
              <Col span={9}>
                <Form.Item name="diagnosis" label="Chẩn đoán">
                  <Input placeholder="Chẩn đoán" />
                </Form.Item>
                <Form.Item name="treatment" label="Phác đồ điều trị">
                  <TextArea placeholder="Phác đồ điều trị" rows={10} />
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item label="Tìm thuốc">
                  <Select
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    placeholder="Nhập tên thuốc"
                    onSelect={addMedicine}
                    options={medicines.map((medicine) => ({
                      value: medicine,
                      label: medicine,
                    }))}
                  />
                </Form.Item>
                <div className="mt-6 h-72 overflow-y-auto rounded-md border-[1px] border-[#d9d9d9] duration-100 ease-in hover:border-[#1677ff]">
                  <List
                    size="small"
                    dataSource={selectedMedicines}
                    renderItem={(
                      item: { name: string; quantity: number },
                      index: number,
                    ) => (
                      <List.Item>
                        <div className="flex w-full items-center justify-between">
                          <span>{item.name}</span>
                          <div className="flex items-center gap-2">
                            <QuantityButton
                              quantity={item.quantity}
                              onQuantityChange={(newQuantity) =>
                                updateMedicineQuantity(index, newQuantity)
                              }
                            />
                            <Button
                              size="middle"
                              shape="circle"
                              icon={
                                <AiOutlineDelete size={18} color="#ff4d4f" />
                              }
                              onClick={() => removeMedicine(index)}
                            />
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                </div>
              </Col>
            </Row>
          </Form>

          <div className="absolute bottom-0 right-0 z-10">
            <Button
              loading={isLoading}
              onClick={() => form.submit()}
              size="large"
              type="primary"
            >
              Tạo hồ sơ
            </Button>
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default Treatment;
