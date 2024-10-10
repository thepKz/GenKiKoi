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
} from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { CustomTable } from "../../share";
import { useEffect, useState } from "react";
import { getValue } from "../../utils";
import { handleAPI } from "../../apis/handleAPI";

const Staffs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [staffs, setStaffs] = useState<any>([]);
  const [doctors, setDoctors] = useState<any>([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [editingPerson, setEditingPerson] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState<"staff" | "doctor">("staff");

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
        const api = `/api/doctors/`;
        const res = await handleAPI(api, undefined, "GET");
        setDoctors(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
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
      render: (_text, _record, index) => index + 1,
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
      render: (_text, _record, index) => index + 1,
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

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Nhân viên",
      children: (
        <CustomTable
          loading={isLoading}
          columns={staffColumn}
          dataSource={staffs}
          scroll="calc(100vh - 410px)"
          className="staff-table"
        />
      ),
    },
    {
      key: "2",
      label: "Bác sĩ",
      children: (
        <CustomTable
          loading={isLoading}
          columns={doctorColumn}
          dataSource={doctors}
          scroll="calc(100vh - 410px)"
          className="staff-table"
        />
      ),
    },
  ];

  return (
    <div>
      <div className="container mx-auto my-5 h-[calc(100vh-115px)] rounded-md bg-white p-5 shadow-sm lg:w-[95%]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="heading-3">Danh sách nhân viên và bác sĩ</h1>
          <Button
            type="primary"
            onClick={() => handleOpenModal(undefined, currentTab)}
          >
            Thêm {currentTab === "staff" ? "nhân viên" : "bác sĩ"}
          </Button>
        </div>
        <Divider />
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={(key) => setCurrentTab(key === "1" ? "staff" : "doctor")}
        />

        {/* Add/Edit modal */}
        <Modal
          open={isModalOpen}
          style={{ top: 60 }}
          onCancel={() => setIsModalOpen(false)}
          onClose={() => setIsModalOpen(false)}
          onOk={() => form.submit()}
          cancelText="Hủy"
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
                <Form.Item name="fullName" label="Họ và tên" required>
                  <Input
                    allowClear
                    placeholder={`Nhập tên ${currentTab === "staff" ? "nhân viên" : "bác sĩ"}`}
                  />
                </Form.Item>

                <Form.Item name="email" label="Email" required>
                  <Input allowClear placeholder="Nhập email" />
                </Form.Item>

                <Form.Item name="gender" label="Giới tính" required>
                  <Select
                    placeholder="Chọn giới tính"
                    options={[
                      { value: "nam", label: "Nam" },
                      { value: "nữ", label: "Nữ" },
                    ]}
                  />
                </Form.Item>
                {currentTab === "staff" && (
                  <Form.Item name="position" label="Vị trí" required>
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
                  <Form.Item name="workShift" label="Ca làm" required>
                    <Select
                      placeholder="Chọn ca làm"
                      options={[
                        { value: "Morning", label: "Sáng" },
                        { value: "Afternoon", label: "Chiều" },
                        { value: "Night", label: "Tối" },
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
                        required
                      >
                        <Input placeholder="Tên chứng chỉ" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="licenseNumber"
                        label="Mã số chứng chỉ"
                        required
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
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="yearOfExperience"
                        label="Năm kinh nghiệm"
                        required
                      >
                        <Input placeholder="Số năm kinh nghiệm" />
                      </Form.Item>
                    </Col>
                  </Row>
                )}
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Staffs;
