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
import { HeaderPage } from "../../components";
import { removeVietnameseTones } from "../../utils";

const { TextArea } = Input;

const Services = () => {
  const [form] = Form.useForm();
  const [services, setServices] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [searchText, setSearchText] = useState("");

  const columns: TableProps["columns"] = [
    {
      key: "#",
      title: "#",
      dataIndex: "key",
      width: 100,
      render: (_text, _record, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
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
      sorter: (a, b) => a.price - b.price,
    },
    {
      key: "Khả dụng",
      title: "Khả dụng",
      dataIndex: "availableAt",
      render: (values) =>
        values.map((value: string) => (
          <Tag color={getValue(value)}>{value}</Tag>
        )),
      filters: [
        {
          text: "Tại phòng khám",
          value: "Tại phòng khám",
        },
        {
          text: "Tại nhà",
          value: "Tại nhà",
        },
        {
          text: "Tư vấn trực tuyến",
          value: "Tư vấn trực tuyến",
        },
      ],
      onFilter: (value: any, record) => record.availableAt.includes(value),
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
            danger
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
          setServices([res.data, ...services]);
        }
        message.success(res.message);
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message || "Có lỗi xảy ra, vui lòng thử lại sau!");
    } finally {
      setIsLoadingForm(false);
      setIsModalOpen(false);
      setEditingService(null);
      form.resetFields();
    }
  };

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

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const filteredServices = services.filter((service: any) => {
    const searchValue = removeVietnameseTones(searchText.toLowerCase());
    const serviceName = removeVietnameseTones(
      service.serviceName.toLowerCase(),
    );
    const description = removeVietnameseTones(
      (service.description || "").toLowerCase(),
    );

    return (
      serviceName.includes(searchValue) || description.includes(searchValue)
    );
  });

  if (isLoading) {
    return (
      <div className="section flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="section manager services">
      <HeaderPage
        heading="Danh sách dịch vụ"
        placeholder="Tìm kiếm dịch vụ (Tên dịch vụ, mô tả dịch vụ)"
        alt="Tìm kiếm dịch vụ (Tên dịch vụ, mô tả dịch vụ)"
        onSearch={handleSearch}
      />
      <div className="mb-4 text-right">
        <Button type="primary" onClick={() => handleOpenModal()}>
          Thêm dịch vụ
        </Button>
      </div>
      <div className="staff-view">
        <CustomTable
          scroll="calc(100vh - 310px)"
          loading={isLoading}
          columns={columns}
          dataSource={filteredServices}
          onChange={(pagination) => setPagination(pagination)}
        />
      </div>
      {/* Add service modal */}
      <Modal
        open={isModalOpen}
        style={{ top: 60 }}
        onCancel={() => setIsModalOpen(false)}
        onClose={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        cancelText="Hủy"
        confirmLoading={isLoadingForm}
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
              <Form.Item
                name="serviceName"
                label="Tên dịch vụ"
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên dịch vụ",
                  },
                  {
                    min: 5,
                    message: "Tên dịch vụ phải chứa ít nhất 5 ký tự",
                  },
                  {
                    max: 50,
                    message: "Tên dịch vụ không được vượt quá 50 ký tự",
                  },
                ]}
              >
                <Input allowClear placeholder="Nhập tên dịch vụ!" />
              </Form.Item>
              <Form.Item
                name="price"
                label="Giá dịch vụ"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá dịch vụ",
                  },
                  {
                    type: "number",
                    min: 0,
                    max: 10000000,
                    message:
                      "Giá dịch vụ phải nằm trong khoảng từ 0 đến 10.000.000",
                  },
                ]}
              >
                <InputNumber<number>
                  min={0}
                  max={10000000}
                  formatter={(value) =>
                    `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) =>
                    value?.replace(/\đ\s?|(,*)/g, "") as unknown as number
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                name="availableAt"
                label="Khả dụng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng lựa chọn!",
                  },
                ]}
              >
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
              <Form.Item
                name="description"
                label="Mô tả dịch vụ"
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mô tả dịch vụ",
                  },
                  {
                    min: 10,
                    message: "Mô tả dịch vụ phải chứa ít nhất 10 ký tự",
                  },
                  {
                    max: 1000,
                    message: "Mô tả dịch vụ không được vượt quá 1000 ký tự",
                  },
                ]}
              >
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
  );
};

export default Services;
