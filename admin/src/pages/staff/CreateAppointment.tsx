import {
  Col,
  Form,
  message,
  Row,
  Select,
  SelectProps,
  Input,
  Spin,
  ConfigProvider,
  Card,
  Button,
} from "antd";
import { useEffect, useState } from "react";
import VietNamProvinces from "../../data";
import { CustomerData } from "../../models/DataModels";
import { handleAPI } from "../../apis/handleAPI";
import { CustomCalendar } from "../../share";
import { HeaderPage } from "../../components";

const { TextArea } = Input;

const demoSlots = [
  { id: 1, time: "8:00" },
  { id: 2, time: "9:00" },
  { id: 3, time: "10:00" },
  { id: 4, time: "11:00" },
  { id: 5, time: "12:00" },
  { id: 6, time: "13:00" },
  { id: 7, time: "14:00" },
  { id: 8, time: "15:00" },
  { id: 9, time: "16:00" },
];

const CreateAppointment = () => {
  const [form] = Form.useForm();

  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [slot, setSlot] = useState<number | null>(null);
  const [date, setDate] = useState<string>("");

  const [city, setCity] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [ward, setWard] = useState<string>("");

  const [cities, setCities] = useState<SelectProps["options"]>([]);
  const [districts, setDistricts] = useState<SelectProps["options"]>([]);
  const [wards, setWards] = useState<SelectProps["options"]>([]);
  const [profile, setProfile] = useState<CustomerData | null>(null);

  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [consultingOptions, setConsultingOptions] = useState([]);

  useEffect(() => {
    const res = VietNamProvinces.map((item: any) => ({
      value: item.Name,
      label: item.Name,
    }));
    setCities(res);
  }, []);

  useEffect(() => {
    const res = VietNamProvinces.find((item: any) => item.Name === city);
    const res1 = res?.Districts?.map((item: any) => ({
      value: item.Name,
      label: item.Name,
    }));
    setDistricts(res1);

    if (form.getFieldValue(["district"])) {
      form.setFieldValue("district", "");
      form.setFieldValue("ward", "");
    }
  }, [city]);

  useEffect(() => {
    const res = VietNamProvinces.find((item: any) => item.Name === city);
    const res1 = res?.Districts.find((item: any) => item.Name === district);
    const res2 = res1?.Wards.map((item: any) => ({
      value: item.Name,
      label: item.Name,
    }));
    setWards(res2);

    if (form.getFieldValue(["ward"])) {
      form.setFieldValue("ward", "");
    }
  }, [district]);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setIsLoading(true);
        const api = `api/users/`;
        const res = await handleAPI(api, undefined, "GET");
        setProfile(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        fullName: profile.fullName,
        phoneNumber: profile.phoneNumber,
        gender: profile.gender,
        city: profile.city,
        district: profile.district,
        ward: profile.ward,
        detailAddress: profile.detailAddress,
      });
    }
  }, [profile]);

  useEffect(() => {
    const getAllServices = async () => {
      try {
        const api = `/api/services/`;
        const res = await handleAPI(api, undefined, "GET");
        setServices(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      }
    };
    getAllServices();
  }, []);

  useEffect(() => {
    const getAllDoctors = async () => {
      try {
        const api = `/api/doctors/all`;
        const res = await handleAPI(api, undefined, "GET");
        setDoctors(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      }
    };
    getAllDoctors();
  }, []);

  const handleServiceChange = (value: string) => {
    form.setFieldValue("typeOfConsulting", undefined);
    const selectedService: any = services.find(
      (service: any) => service.serviceName === value,
    );
    if (selectedService) {
      setConsultingOptions(
        selectedService.availableAt.map((option: any) => ({
          value: option,
          label: option,
        })),
      );
    } else {
      setConsultingOptions([]);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      setIsLoadingForm(true);
      const api = `/api/appointments/`;

      if (date) {
        values.appointmentDate = date;
      }

      if (slot) {
        values.slotTime = demoSlots[slot - 1].time;
      }

      const res: any = await handleAPI(api, values, "PUT");

      message.success(res.message);
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    } finally {
      setIsLoadingForm(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-green-dark flex h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="section">
      <HeaderPage heading="Tạo lịch khám bệnh" />
      <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 10,
            },
            Card: {
              paddingLG: 5,
            },
          },
        }}
      >
        <div className="flex h-[calc(100vh-145px)] flex-col justify-between">
          <Form size="large" layout="vertical">
            <div className="grid grid-cols-[220px_350px_1fr] gap-10">
              <div className="">
                <Form.Item name="serviceName" label="Loại dịch vụ" required>
                  <Select
                    placeholder="Chọn loại dịch vụ"
                    style={{ width: "100%" }}
                    options={services.map((service: any) => ({
                      value: service.serviceName,
                      label: service.serviceName,
                    }))}
                    onChange={handleServiceChange}
                  />
                </Form.Item>
                <Form.Item name="doctorName" label="Bác sĩ" required>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Chọn bác sĩ"
                    options={doctors.map((doctor: any) => ({
                      value: doctor.fullName,
                      label: "Bs. " + doctor.fullName,
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  name="typeOfConsulting"
                  label="Hình thức khám"
                  required
                >
                  <Select
                    placeholder="Chọn hình thức khám"
                    style={{ width: "100%" }}
                    options={consultingOptions}
                  />
                </Form.Item>
              </div>
              <div className="">
                <Form.Item
                  name="appointmentDate"
                  label="Thời gian khám"
                  required
                >
                  <CustomCalendar setDate={setDate} />
                </Form.Item>
                <Form.Item name="slotTime" className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {demoSlots.map((slotTime) => (
                      <Card
                        key={slotTime.id}
                        style={{ width: 60, textAlign: "center" }}
                        onClick={() => setSlot(slotTime.id)}
                        className={
                          slot === slotTime.id
                            ? "bg-[#1677ff] text-white"
                            : "hover:bg-[#1677ff] hover:text-white"
                        }
                      >
                        {slotTime.time}
                      </Card>
                    ))}
                  </div>
                </Form.Item>
              </div>
              <div className="">
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item required name="fullName" label="Họ và tên">
                      <Input
                        defaultValue={profile?.fullName}
                        placeholder="Họ và tên"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      required
                      name="phoneNumber"
                      label="Số điện thoại"
                    >
                      <Input
                        className="addon-input"
                        addonBefore="+84"
                        placeholder="Số điện thoại"
                        defaultValue={profile?.phoneNumber}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="gender" label="Giới tính">
                      <Select
                        placeholder="Giới tính"
                        defaultValue={
                          profile?.gender === undefined
                            ? null
                            : profile?.gender === true
                              ? "Nam"
                              : "Nữ"
                        }
                        options={[
                          { value: "nữ", label: "Nữ" },
                          { value: "nam", label: "Nam" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item name="city" label="Tỉnh">
                      <Select
                        placeholder="Thành phố"
                        value={city}
                        defaultValue={profile?.city}
                        onChange={(e) => {
                          setCity(e);
                        }}
                        options={cities}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="district" label="Quận / Huyện">
                      <Select
                        placeholder="Quận / Huyện"
                        defaultValue={profile?.district}
                        onChange={(e) => {
                          setDistrict(e);
                        }}
                        options={districts}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="ward" label="Phường / Xã">
                      <Select
                        placeholder="Phường / Xã"
                        defaultValue={profile?.ward}
                        value={ward}
                        onChange={(e) => setWard(e)}
                        options={wards}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item name="address" label="Địa chỉ">
                      <Input
                        placeholder="Địa chỉ"
                        defaultValue={profile?.detailAddress}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      tooltip="Hãy mô tả kỹ lý do khám cho cá của bạn nhé"
                      name="reasons"
                      label="Lý do khám"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập lý do khám!",
                        },
                      ]}
                    >
                      <TextArea placeholder="Lý do khám" rows={6} />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </div>
          </Form>
          <div className="text-right">
            <Button size="large" type="primary">
              Tạo cuộc hẹn
            </Button>
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default CreateAppointment;