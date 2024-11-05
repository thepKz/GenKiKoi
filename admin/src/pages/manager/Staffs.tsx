import {
  Button,
  Divider,
  message,
  TableProps,
  Tabs,
  TabsProps,
  Tag,
  Form,
  Input,
  Modal,
  Select,
  Row,
  Col,
  Spin,
  InputNumber,
} from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { CustomTable } from "../../share";
import { useEffect, useState } from "react";
import { getValue } from "../../utils";
import { handleAPI } from "../../apis/handleAPI";
import { HeaderPage } from "../../components";
import { removeVietnameseTones } from "../../utils";

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
        message.error(error.message);
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
        message.error(error.message);
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
            setStaffs([...staffs, res.data]);
          } else {
            setDoctors([...doctors, res.data]);
          }
        }
        message.success(res.message);
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
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

  // Cập nhật cột action trong staffColumn và doctorColumn
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
          onClick={() => handleDelete(record._id, isStaff)}
          shape="circle"
          icon={<AiOutlineDelete size={20} color="#ff4d4f" />}
        />
      </div>
    ),
  });

  // Thêm getActionColumn vào cuối staffColumn và doctorColumn
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
      width: 60,
      render: (text) => (
        <Tag color={getValue(text)}>{text === "nam" ? "Nam" : "Nữ"}</Tag>
      ),
    },
    {
      key: "Vị trí",
      title: "Vị trí",
      dataIndex: "position",
      width: 100,
      render: (text) => <Tag color={getValue(text)}>{text}</Tag>,
    },
    {
      key: "Ngày bắt đầu công việc",
      title: "Ngày bắt đầu công việc",
      dataIndex: "startDate",
      width: 150,
      render: (date) => new Date(date).toLocaleDateString(),
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
      width: 60,
      render: (text) => (
        <Tag color={getValue(text)}>{text === "nam" ? "Nam" : "Nữ"}</Tag>
      ),
    },
    {
      key: "Dịch vụ di động",
      title: "Dịch vụ di động",
      dataIndex: "movingService",
      width: 100,
      render: (text) => (
        <Tag color={getValue(text === true ? "yes" : "no")}>
          {text === true ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      key: "Ngày bắt đầu công việc",
      title: "Ngày bắt đầu công việc",
      dataIndex: "startDate",
      width: 150,
      render: (date) => new Date(date).toLocaleDateString(),
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
        // Thêm trường tìm kiếm cho nhân viên
        additionalSearchFields = removeVietnameseTones(
          person.position.toLowerCase(),
        );
      } else {
        // Thêm trường tìm kiếm cho bác sĩ
        additionalSearchFields = removeVietnameseTones(
          `${person.specialization || ""} ${person.movingService ? "có di động" : "không di động"}`.toLowerCase(),
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

  if (isLoading) {
    return (
      <div className="section flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="section">
      <HeaderPage
        heading="Danh sách nhân viên và bác sĩ"
        placeholder={`Tìm ${currentTab === "staff" ? "nhân viên" : "bác sĩ"}`}
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

      {/* Add/Edit modal */}
      <Modal
        open={isModalOpen}
        style={{ top: 60 }}
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
                ]}
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
                ]}
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
                      ]}
                    >
                      <Input placeholder="Tên chứng chỉ" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="licenseNumber"
                      label="Mã số chứng chỉ"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mã số chứng chỉ",
                        },
                      ]}
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
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Staffs;
