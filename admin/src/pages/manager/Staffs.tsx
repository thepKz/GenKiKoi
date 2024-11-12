import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Spin,
  TableProps,
  Tabs,
  TabsProps,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { handleAPI } from "../../apis/handleAPI";
import { HeaderPage } from "../../components";
import { CustomTable } from "../../share";
import { getValue, removeVietnameseTones } from "../../utils";

const Staffs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [staffs, setStaffs] = useState<any>([]);
  const [doctors, setDoctors] = useState<any>([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [editingPerson, setEditingPerson] = useState<any>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [currentTab, setCurrentTab] = useState<"staff" | "doctor">("staff");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getAllStaffs = async () => {
      try {
        setIsLoading(true);
        const api = `/api/staffs/`;
        const res = await handleAPI(api, undefined, "GET");
        setStaffs(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(
          error.message || "Có lỗi xảy ra khi lấy danh sách nhân viên!",
        );
      } finally {
        setIsLoading(false);
      }
    };
    getAllStaffs();
  }, []);

  useEffect(() => {
    const getAllDoctors = async () => {
      try {
        setIsLoading(true);
        const api = `/api/doctors/`;
        const res = await handleAPI(api, undefined, "GET");
        setDoctors(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(
          error.message || "Có lỗi xảy ra khi lấy danh sách bác sĩ!",
        );
      } finally {
        setIsLoading(false);
      }
    };
    getAllDoctors();
  }, []);

  const handleOpenModal = (person?: any, tab: "staff" | "doctor" = "staff") => {
    setCurrentTab(tab);
    if (person) {
      setEditingPerson(person);
      form.setFieldsValue(person);
    } else {
      setEditingPerson(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      setIsLoadingForm(true);
      const isStaff = currentTab === "staff";
      let api = isStaff ? `/api/staffs/` : `/api/doctors/`;
      let method: any = "POST";

      if (editingPerson) {
        api += editingPerson._id;
        method = "PATCH";
      }

      const res: any = await handleAPI(api, values, method);

      if (res) {
        if (editingPerson) {
          if (isStaff) {
            setStaffs(
              staffs.map((s: any) =>
                s._id === editingPerson._id ? res.data : s,
              ),
            );
          } else {
            setDoctors(
              doctors.map((d: any) =>
                d._id === editingPerson._id ? res.data : d,
              ),
            );
          }
        } else {
          if (isStaff) {
            setStaffs([res.data, ...staffs]);
          } else {
            setDoctors([res.data, ...doctors]);
          }
        }
        message.success(res.message);
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message || "Có lỗi xảy ra, vui lòng thử lại sau!");
    } finally {
      setIsLoadingForm(false);
      setIsModalOpen(false);
      setEditingPerson(null);
      form.resetFields();
    }
  };

  const handleDelete = async (personId: string, isStaff: boolean) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: `Bạn có chắc chắn muốn xóa ${isStaff ? "nhân viên" : "bác sĩ"} này không?`,
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const api = isStaff
            ? `/api/staffs/${personId}`
            : `/api/doctors/${personId}`;
          const res: any = await handleAPI(api, undefined, "DELETE");

          if (res) {
            if (isStaff) {
              setStaffs(staffs.filter((staff: any) => staff._id !== personId));
            } else {
              setDoctors(
                doctors.filter((doctor: any) => doctor._id !== personId),
              );
            }
            message.success(res.message);
          }
        } catch (error: any) {
          console.log(error);
          message.error(
            error.message ||
              `Có lỗi xảy ra khi xóa ${isStaff ? "nhân viên" : "bác sĩ"}`,
          );
        }
      },
    });
  };

  const handleCheckExistence = async (field: string, value: string) => {
    const api = `/api/auth/check-${field}`;
    try {
      const res: any = await handleAPI(api, { [field]: value }, "POST");

      if (res.exists) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (personId: string, isStaff: boolean) => {
    const person = isStaff
      ? staffs.find((s: any) => s._id === personId)
      : doctors.find((d: any) => d._id === personId);
    if (person) {
      handleOpenModal(person, isStaff ? "staff" : "doctor");
    } else {
      message.error(`Không tìm thấy ${isStaff ? "nhân viên" : "bác sĩ"}`);
    }
  };

  const getActionColumn = (isStaff: boolean) => ({
    key: "action",
    title: "Sửa / Xóa",
    width: 80,
    render: (_text: any, record: any) => (
      <div className="flex items-center justify-center gap-5">
        <Button
          onClick={() => handleUpdate(record._id, isStaff)}
          shape="circle"
          icon={<CiEdit size={20} color="#1677ff" />}
        />
        <Button
          danger
          onClick={() => handleDelete(record._id, isStaff)}
          shape="circle"
          icon={<AiOutlineDelete size={20} color="#ff4d4f" />}
        />
      </div>
    ),
  });

  const staffColumn: TableProps["columns"] = [
    {
      key: "#",
      title: "#",
      dataIndex: "key",
      width: 50,
      render: (_text, _record, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      key: "Tên nhân viên",
      title: "Tên nhân viên",
      dataIndex: "fullName",
      width: 150,
    },
    {
      key: "Giới tính",
      title: "Giới tính",
      dataIndex: "gender",
      width: 80,
      render: (text) => (
        <Tag color={getValue(text)}>{text === "nam" ? "Nam" : "Nữ"}</Tag>
      ),
      filters: [
        { text: "Nam", value: "nam" },
        { text: "Nữ", value: "nữ" },
      ],
      onFilter: (value: any, record) => record.gender === value,
    },
    {
      key: "Vị trí",
      title: "Vị trí",
      dataIndex: "position",
      width: 100,
      render: (text) => <Tag color={getValue(text)}>{text}</Tag>,
      filters: [
        { text: "Hỗ trợ khách hàng", value: "Hỗ trợ khách hàng" },
        { text: "Tiếp tân", value: "Tiếp tân" },
        { text: "Trợ lý", value: "Trợ lý" },
        { text: "Thu ngân", value: "Thu ngân" },
      ],
      onFilter: (value: any, record) => record.position === value,
    },
    {
      key: "Ngày bắt đầu công việc",
      title: "Ngày bắt đầu công việc",
      dataIndex: "startDate",
      width: 150,
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateA.getTime() - dateB.getTime();
      },
    },
    {
      key: "Email",
      title: "Email",
      dataIndex: "email",
      width: 200,
    },
    getActionColumn(true),
  ];

  const doctorColumn: TableProps["columns"] = [
    {
      key: "#",
      title: "#",
      dataIndex: "key",
      width: 50,
      render: (_text, _record, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      key: "Tên nhân viên",
      title: "Tên nhân viên",
      dataIndex: "fullName",
      width: 150,
    },
    {
      key: "Giới tính",
      title: "Giới tính",
      dataIndex: "gender",
      width: 80,
      render: (text) => (
        <Tag color={getValue(text)}>{text === "nam" ? "Nam" : "Nữ"}</Tag>
      ),
      filters: [
        { text: "Nam", value: "nam" },
        { text: "Nữ", value: "nữ" },
      ],
      onFilter: (value: any, record) => record.gender === value,
    },
    {
      key: "Dịch vụ di động",
      title: "Dịch vụ di động",
      dataIndex: "movingService",
      width: 100,
      render: (text) => (
        <Tag color={getValue(text === true ? "yes" : "no")}>
          {text === true ? "Có" : "Không"}
        </Tag>
      ),
      filters: [
        { text: "Có", value: true },
        { text: "Không", value: false },
      ],
      onFilter: (value: any, record) => record.movingService === value,
    },
    {
      key: "Ngày bắt đầu công việc",
      title: "Ngày bắt đầu công việc",
      dataIndex: "startDate",
      width: 150,
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateA.getTime() - dateB.getTime();
      },
    },
    {
      key: "Email",
      title: "Email",
      dataIndex: "email",
      width: 200,
    },
    getActionColumn(false),
  ];

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const getFilteredData = (data: any[], isStaff: boolean) => {
    return data.filter((person: any) => {
      const searchValue = removeVietnameseTones(searchText.toLowerCase());
      const fullName = removeVietnameseTones(person.fullName.toLowerCase());
      const email = person.email.toLowerCase();

      let additionalSearchFields = "";

      if (isStaff) {
        additionalSearchFields = removeVietnameseTones(
          person.position.toLowerCase(),
        );
      }

      return (
        fullName.includes(searchValue) ||
        email.includes(searchText) ||
        additionalSearchFields.includes(searchValue)
      );
    });
  };

  const filteredStaffs = getFilteredData(staffs, true);
  const filteredDoctors = getFilteredData(doctors, false);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Nhân viên",
      children: (
        <div className="staff-view staff">
          <CustomTable
            loading={isLoading}
            columns={staffColumn}
            dataSource={filteredStaffs}
            scroll="calc(100vh - 320px)"
            className="staff-table"
            onChange={(pagination) => setPagination(pagination)}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "Bác sĩ",
      children: (
        <div className="staff-view staff">
          <CustomTable
            loading={isLoading}
            columns={doctorColumn}
            dataSource={filteredDoctors}
            scroll="calc(100vh - 320px)"
            className="staff-table"
            onChange={(pagination) => setPagination(pagination)}
          />
        </div>
      ),
    },
  ];

  const handleCheckLicenseNumber = async (field: string, value: string) => {
    const api = `/api/doctors/check-${field}`;
    try {
      const res: any = await handleAPI(api, { [field]: value }, "POST");

      if (res.exists) {
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
            itemMarginBottom: 12,
          },
        },
      }}
    >
      <div className="section">
        <HeaderPage
          heading="Danh sách nhân viên và bác sĩ"
          placeholder={`Tìm ${currentTab === "staff" ? "nhân viên (Tên, email, vị trí công việc)" : "bác sĩ (Tên, email)"}`}
          alt={`${currentTab === "staff" ? "Tìm nhân viên (Tên, email, vị trí công việc)" : "Tìm bác sĩ (Tên, email)"}`}
          onSearch={handleSearch}
        />
        <div className="absolute right-14 z-10">
          <Button
            type="primary"
            onClick={() => handleOpenModal(undefined, currentTab)}
          >
            Thêm {currentTab === "staff" ? "nhân viên" : "bác sĩ"}
          </Button>
        </div>
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={(key) => {
            setCurrentTab(key === "1" ? "staff" : "doctor");
            setPagination({
              current: 1,
              pageSize: 10,
            });
          }}
        />

        <Modal
          open={isModalOpen}
          style={{ top: 30 }}
          onCancel={() => setIsModalOpen(false)}
          onClose={() => setIsModalOpen(false)}
          onOk={() => form.submit()}
          cancelText="Hủy"
          confirmLoading={isLoadingForm}
          okText={editingPerson ? "Cập nhật" : "Thêm mới"}
        >
          <div className="p-5 pb-0">
            <h3 className="heading-4">
              {editingPerson
                ? `Cập nhật ${currentTab === "staff" ? "nhân viên" : "bác sĩ"}`
                : `Thêm ${currentTab === "staff" ? "nhân viên" : "bác sĩ"}`}
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
                  name="fullName"
                  label="Họ và tên"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ và tên",
                    },
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
                  hasFeedback
                  validateDebounce={1000}
                >
                  <Input
                    allowClear
                    placeholder={`Nhập tên ${currentTab === "staff" ? "nhân viên" : "bác sĩ"}`}
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập email",
                    },
                    {
                      type: "email",
                      message: "Email không hợp lệ",
                    },
                    {
                      validator: async (_, value) => {
                        if (value && value.trim().length > 0) {
                          const exists = await handleCheckExistence(
                            "email",
                            value,
                          );
                          if (exists) {
                            return Promise.reject(
                              new Error("Email đã tồn tại!"),
                            );
                          }
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                  hasFeedback
                  validateDebounce={1000}
                >
                  <Input allowClear placeholder="Nhập email" />
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
                    placeholder="Chọn giới tính"
                    options={[
                      { value: "nam", label: "Nam" },
                      { value: "nữ", label: "Nữ" },
                    ]}
                  />
                </Form.Item>
                {currentTab === "staff" && (
                  <Form.Item
                    name="position"
                    label="Vị trí"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn vị trí công việc",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Chọn vị trí"
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
                )}

                {currentTab === "staff" && (
                  <Form.Item
                    name="workShift"
                    label="Ca làm"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn ca làm",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Chọn ca làm"
                      options={[
                        { value: "Sáng", label: "Sáng" },
                        { value: "Chiều", label: "Chiều" },
                      ]}
                    />
                  </Form.Item>
                )}

                {currentTab === "doctor" && (
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="specialization"
                        label="Chứng chỉ"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập tên chứng chỉ",
                            
                          },
                          {
                            min: 20,
                            message: "Tên chứng chỉ phải có ít nhất 20 ký tự",
                          },
                          {
                            max: 200,
                            message:
                              "Tên chứng chỉ không được vượt quá 200 ký tự",
                          },
                        ]}
                      >
                        <Input placeholder="Tên chứng chỉ" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="licenseNumber"
                        label="Mã số chứng chỉ"
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập mã số chứng chỉ",
                          },
                          {
                            min: 6,
                            message: "Mã số chứng chỉ phải có ít nhất 2 ký tự",
                          },
                          {
                            max: 20,
                            message: "Mã số chứng chỉ không được vượt quá 20 ký tự",
                          },
                          {
                            validator: async (_, value) => {
                              if (value && value.trim().length > 0) {
                                const exists = await handleCheckLicenseNumber(
                                  "licenseNumber",
                                  value,
                                );

                                if (exists) {
                                  return Promise.reject(
                                    new Error("Chứng chỉ này đã được đăng ký!"),
                                  );
                                }
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                        validateDebounce={1000}
                      >
                        <Input placeholder="Mã số chứng chỉ" />
                      </Form.Item>
                    </Col>
                  </Row>
                )}

                {currentTab === "doctor" && (
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="movingService"
                        label="Dịch vụ di động"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn hình thức",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Chọn dịch vụ di động"
                          options={[
                            { value: true, label: "Có" },
                            { value: false, label: "Không" },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="yearOfExperience"
                        label="Năm kinh nghiệm"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập số năm kinh nghiệm",
                          },
                        ]}
                      >
                        <InputNumber
                          min={0}
                          max={100}
                          placeholder="Số năm kinh nghiệm"
                          className="w-full"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                )}

                {currentTab === "doctor" && (
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        name="googleMeetLink"
                        label="Link google meet"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập link google meet",
                          },
                          {
                            pattern:
                              /^https:\/\/meet\.google\.com\/[a-z0-9-]+$/i,
                            message:
                              "Link Google Meet không hợp lệ",
                          },
                        ]}
                      >
                        <Input placeholder="Link google meet" />
                      </Form.Item>
                    </Col>
                  </Row>
                )}
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default Staffs;
