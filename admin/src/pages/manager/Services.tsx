import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Spin,
  TableProps,
  Tag,
} from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";
import { CustomTable } from "../../share";
import { getValue } from "../../utils";

const { TextArea } = Input;

const Services = () => {
  const [form] = Form.useForm();
  const [services, setServices] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  const columns: TableProps["columns"] = [
    {
      key: "#",
      title: "#",
      dataIndex: "key",
      width: 100,
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "Tên dịch vụ",
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      width: 200,
    },
    {
      key: "Giá dịch vụ",
      title: "Giá dịch vụ",
      dataIndex: "price",
      width: 150,
      render: (price) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price),
    },
    {
      key: "Khả dụng",
      title: "Khả dụng",
      dataIndex: "availableAt",
      render: (values) =>
        values.map((value: string) => (
          <Tag color={getValue(value)}>{value}</Tag>
        )),
    },
    {
      key: "Mô tả dịch vụ",
      title: "Mô tả dịch vụ",
      dataIndex: "description",
    },
    {
      key: "action",
      title: "Sửa / Xóa",
      width: 120,
      render: (_text, record) => (
        <div className="flex items-center justify-center gap-5">
          <Button
            onClick={() => handleUpdate(record._id)}
            shape="circle"
            icon={<CiEdit size={20} color="#1677ff" />}
          />

          <Button
            onClick={() => handleDelete(record._id)}
            shape="circle"
            icon={<AiOutlineDelete color="#ff4d4f" size={20} />}
          />
        </div>
      ),
    },
  ];

  const handleOpenModal = (service?: any) => {
    if (service) {
      setEditingService(service);
      form.setFieldsValue(service);
    } else {
      setEditingService(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  useEffect(() => {
    const getAllServices = async () => {
      try {
        setIsLoading(true);
        const api = `/api/services/`;
        const res = await handleAPI(api, undefined, "GET");
        setServices(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getAllServices();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoadingForm(true);
      let api = `/api/services/`;
      let method: any = "POST";

      if (editingService) {
        api += editingService._id;
        method = "PATCH";
      }

      const res: any = await handleAPI(api, values, method);

      if (res) {
        if (editingService) {
          setServices(
            services.map((s: any) =>
              s._id === editingService._id ? res.data : s,
            ),
          );
        } else {
          setServices([...services, res.data]);
        }
        message.success(res.message);
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    } finally {
      setIsLoadingForm(false);
      setIsModalOpen(false);
      setEditingService(null);
      form.resetFields();
    }
  };

  // Ê đoạn này hay nha!
  const handleDelete = async (serviceId: string) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa dịch vụ này không?",
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const api = `/api/services/${serviceId}`;
          const res = await handleAPI(api, undefined, "DELETE");

          if (res) {
            setServices(
              services.filter((service: any) => service._id !== serviceId),
            );
            message.success("Đã xóa dịch vụ thành công");
          }
        } catch (error: any) {
          console.log(error);
          message.error(error.message || "Có lỗi xảy ra khi xóa dịch vụ");
        }
      },
    });
  };

  const handleUpdate = (serviceId: string) => {
    const service = services.find((s: any) => s._id === serviceId);
    if (service) {
      handleOpenModal(service);
    } else {
      message.error("Không tìm thấy dịch vụ");
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
    <div>
      <div className="container mx-auto my-5 h-[calc(100vh-115px)] rounded-md bg-white p-5 shadow-sm lg:w-[95%]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="heading-3">Danh sách dịch vụ</h1>
          <Button type="primary" onClick={() => handleOpenModal()}>
            Thêm dịch vụ
          </Button>
        </div>
        <Divider />
        <div className="">
          <CustomTable columns={columns} dataSource={services} />
        </div>
        {/* Add service modal */}
        <Modal
          open={isModalOpen}
          style={{ top: 60 }}
          onCancel={() => setIsModalOpen(false)}
          onClose={() => setIsModalOpen(false)}
          onOk={() => form.submit()}
          cancelText="Hủy"
          okText={editingService ? "Cập nhật" : "Thêm mới"}
        >
          <div className="p-5 pb-0">
            <h3 className="heading-4">
              {editingService ? "Cập nhật dịch vụ" : "Thêm dịch vụ"}
            </h3>
            <Divider />
            <div>
              <Form
                onFinish={handleSubmit}
                disabled={isLoadingForm}
                form={form}
                size="large"
                layout="vertical"
              >
                <Form.Item name="serviceName" label="Tên dịch vụ" required>
                  <Input allowClear placeholder="Nhập tên dịch vụ!" />
                </Form.Item>
                <Form.Item name="price" label="Giá dịch vụ" required>
                  <InputNumber<number>
                    min={0}
                    max={100000000}
                    formatter={(value) =>
                      `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) =>
                      value?.replace(/\đ\s?|(,*)/g, "") as unknown as number
                    }
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item name="availableAt" label="Khả dụng" required>
                  <Select
                    mode="multiple"
                    allowClear
                    placeholder="Khả dụng tại ..."
                    options={[
                      { value: "Tại phòng khám", label: "Tại phòng khám" },
                      { value: "Tại nhà", label: "Tại nhà" },
                      {
                        value: "Tư vấn trực tuyến",
                        label: "Tư vấn trực tuyến",
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item name="description" label="Mô tả dịch vụ" required>
                  <TextArea
                    placeholder="Nhập mô tả dịch vụ"
                    autoSize={{ minRows: 4, maxRows: 4 }}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Services;
