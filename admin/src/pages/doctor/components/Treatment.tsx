import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  List,
  Row,
  Select,
  Upload,
} from "antd";
import { medicines } from "../../../constants";
import { AiOutlineDelete } from "react-icons/ai";
import { QuantityButton } from "../../../share";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";

const { TextArea } = Input;

const Treatment = () => {
  const [form] = useForm();
  const [selectedMedicines, setSelectedMedicines] = useState<any>([]);

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
          <Form form={form} layout="vertical" size="large">
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item label="Số điện thoại">
                  <Input placeholder="Số điện thoại" />
                </Form.Item>
                <Form.Item label="Khám bệnh / Tái khám">
                  <Select
                    defaultValue={"Khám bệnh"}
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
                <Form.Item label="Hình ảnh">
                  <Upload accept="image/png">
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item label="Chẩn đoán">
                  <Input placeholder="Chẩn đoán" />
                </Form.Item>
                <Form.Item label="Phác đồ điều trị">
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

          <div className="text-right">
            <Button size="large" type="primary">
              Tạo hồ sơ
            </Button>
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default Treatment;
