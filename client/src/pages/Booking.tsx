import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  SelectProps,
  Spin,
} from "antd";

import { useEffect, useState } from "react";
import VietNamProvinces from "../../data";
import { handleAPI } from "../apis/handleAPI";
import { CustomerData } from "../models/DataModels";
import { CustomCalendar } from "../share";
import { useSelector } from "react-redux";
import { IAuth } from "../types";
import dayjs from "dayjs";

const { TextArea } = Input;

const Booking = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

  const [form] = Form.useForm();
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [slot, setSlot] = useState<string | null>(null);
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);

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

  const [service, setService] = useState<any>(null);
  const [price, setPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [doctorSchedule, setDoctorSchedule] = useState<any>(null);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);

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

  useEffect(() => {
    setTotalPrice(0);
    setTotalPrice((prevPrice) => prevPrice + price);
  }, [price]);

  const handleServiceChange = (value: string) => {
    form.setFieldValue("typeOfConsulting", undefined);
    const selectedService: any = services.find((service: any) => service.serviceName === value);
    setService(selectedService);
    setPrice(selectedService.price);
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

  const handleDoctorChange = async (doctorId: string) => {
    try {
      setDoctorSchedule(null);
      setAvailableSlots([]);
      setDate(null);
      setSlot(null);
      const api = `/api/doctorSchedules/${doctorId}`;
      const res = await handleAPI(api, undefined, "GET");
      if (res.data) {
        setDoctorSchedule(res.data);
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    }
  };

  const handleDateChange = async (selectedDate: dayjs.Dayjs) => {
    if (doctorSchedule) {
      const formattedDate = selectedDate.format("DD/MM/YYYY");
      const daySchedule = doctorSchedule.weekSchedule.find(
        (day: any) => day.dayOfWeek === formattedDate,
      );

      if (daySchedule) {
        setAvailableSlots(daySchedule.slots);
      } else {
        setAvailableSlots([]);
        message.info("Không có lịch khám cho ngày này");
      }
    }
    setDate(selectedDate);
    setSlot(null);
  };

  console.log(doctorSchedule);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoadingForm(true);
      const appointmentApi = `/api/appointments/customers/${auth.customerId}`;
      const bookSlotApi = `/api/doctorSchedules/${doctorSchedule.doctorId}`;

      if (date && slot && doctorSchedule) {
        values.appointmentDate = date.format("YYYY-MM-DD");
        values.doctorScheduleId = doctorSchedule._id;
        values.slotTime = slot;
      } else {
        message.error("Vui lòng chọn ngày và giờ khám");
        return;
      }

      const appointmentRes: any = await handleAPI(appointmentApi, values, "POST");

      await handleAPI(
        bookSlotApi,
        {
          slotTime: slot,
          appointmentId: appointmentRes.data.appointmentId,
          appointmentDate: date,
        },
        "PATCH",
      );

      if (appointmentRes.data.appointmentId) {
        const paymentApi = `/api/payments/create-payment`;
        const paymentRes = await handleAPI(
          paymentApi,
          {
            totalPrice: totalPrice,
            customerId: auth.customerId,
            serviceName: service.serviceName,
            appointmentId: appointmentRes.data.appointmentId,
          },
          "POST",
        );
        if (paymentRes.data.checkoutUrl) {
          window.open(paymentRes.data.checkoutUrl, "_blank");
        } else {
          message.error("Không thể tạo liên kết thanh toán");
        }
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    } finally {
      setIsLoadingForm(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-green-dark">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="booking bg-green-dark py-36 pb-16 text-white">
      <div className="container mx-auto lg:px-28">
        <div className="rounded-md bg-blue-primary p-5 px-10">
          <ConfigProvider
            theme={{
              token: {
                fontFamily: "Pro-Rounded",
              },
              components: {
                Form: {
                  labelColor: "white",
                  fontSize: 17,
                },
                Divider: {
                  marginLG: 8,
                },
              },
            }}
          >
            <Form
              form={form}
              disabled={isLoadingForm}
              onFinish={handleSubmit}
              size="large"
              layout="vertical"
            >
              <h3 className="heading-3 text-white">Nội dung chi tiết đặt hẹn</h3>
              <div className="my-5 flex gap-10">
                <div className="lg:w-1/5">
                  <Form.Item
                    name="serviceName"
                    label="Loại dịch vụ"
                    required
                  >
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
                  <Form.Item
                    name="doctorId"
                    label="Bác sĩ"
                    required
                  >
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Chọn bác sĩ"
                      options={doctors.map((doctor: any) => ({
                        value: doctor.id,
                        label: "Bs. " + doctor.fullName,
                      }))}
                      onChange={handleDoctorChange}
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
                  <div className="mt-20">
                    <h1 className="text-2xl font-semibold text-white">Thanh toán</h1>
                    <Divider style={{ borderColor: "white" }} />
                    <div className="flex items-center justify-between text-white">
                      <span>Giá dịch vụ:</span>
                      <span>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(price)}
                      </span>
                    </div>
                    <Divider style={{ borderColor: "white" }} />
                    <div className="flex items-center justify-between text-white">
                      <span>Tổng tiền:</span>
                      <span>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="lg:w-[30%]">
                  <Form.Item
                    name="appointmentDate"
                    label="Thời gian khám"
                    required
                  >
                    <CustomCalendar
                      setDate={handleDateChange}
                      doctorSchedule={doctorSchedule}
                    />
                  </Form.Item>
                  <Form.Item
                    name="slotTime"
                    className="mt-5"
                  >
                    <div className="flex flex-wrap gap-4">
                      {availableSlots.map((slotTime: any) => (
                        <ConfigProvider
                          key={slotTime.slotTime}
                          theme={{
                            components: {
                              Card: {
                                paddingLG: 5,
                              },
                            },
                          }}
                        >
                          <Card
                            style={{ width: 70, textAlign: "center" }}
                            onClick={() => !slotTime.isBooked && setSlot(slotTime.slotTime)}
                            className={
                              slot === slotTime.slotTime
                                ? "bg-green-dark text-white"
                                : !slotTime.isBooked
                                  ? "hover:bg-green-dark hover:text-white"
                                  : "cursor-not-allowed opacity-50"
                            }
                          >
                            {slotTime.slotTime}
                          </Card>
                        </ConfigProvider>
                      ))}
                    </div>
                  </Form.Item>
                </div>
                <div className="lg:w-[45%]">
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        required
                        name="fullName"
                        label="Họ và tên"
                      >
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
                      <Form.Item
                        name="gender"
                        label="Giới tính"
                      >
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
                            { value: "nam", label: "Nam" },
                            { value: "nữ", label: "Nữ" },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={8}>
                      <Form.Item
                        name="city"
                        label="Tỉnh"
                      >
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
                      <Form.Item
                        name="district"
                        label="Quận / Huyện"
                      >
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
                      <Form.Item
                        name="ward"
                        label="Phường / Xã"
                      >
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
                      <Form.Item
                        name="detailAddress"
                        label="Địa chỉ"
                      >
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
                        rules={[{ required: true, message: "Vui lòng nhập lý do khám!" }]}
                      >
                        <TextArea
                          placeholder="Lý do khám"
                          rows={4}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </div>
            </Form>
          </ConfigProvider>
          <div className="text-right">
            <ConfigProvider
              theme={{
                inherit: false,
                token: {
                  fontFamily: "Pro-Rounded",
                },
              }}
            >
              <Button
                size="large"
                type="primary"
                loading={isLoadingForm}
                className="mt-3 w-fit"
                onClick={() => form.submit()}
              >
                Thanh toán
              </Button>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
