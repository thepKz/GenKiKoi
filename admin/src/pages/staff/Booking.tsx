import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  SelectProps,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { handleAPI } from "../../apis/handleAPI";
import { HeaderPage } from "../../components";
import VietNamProvinces from "../../data";
import { CustomCalendar } from "../../share";

const { TextArea } = Input;

const Booking = () => {
  const [form] = Form.useForm();

  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const [profile, setProfile] = useState<any>(null);

  const [slot, setSlot] = useState<number | null>(null);
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);

  const [city, setCity] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [ward, setWard] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>("");

  const [cities, setCities] = useState<SelectProps["options"]>([]);
  const [districts, setDistricts] = useState<SelectProps["options"]>([]);
  const [wards, setWards] = useState<SelectProps["options"]>([]);

  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [consultingOptions, setConsultingOptions] = useState([]);

  const [doctorSchedule, setDoctorSchedule] = useState<any>(null);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [service, setService] = useState<any>(null);
  const [price, setPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [transportFee, setTransportFee] = useState<number>(0);

  const [isDistanceDisabled, setIsDistanceDisabled] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      const { phoneNumber, email, fullName, gender } = values;

      setIsLoadingForm(true);

      if (date && slot && doctorSchedule) {
        values.appointmentDate = date.format("YYYY-MM-DD");
        values.doctorScheduleId = doctorSchedule._id;
        values.slotTime = slot;
      } else {
        message.error("Vui lòng chọn ngày và giờ khám");
        return;
      }

      let currentProfile = profile;

      if (!profile) {
        const registerApi = `/api/auth/register-at-center`;
        const res = await handleAPI(
          registerApi,
          {
            phoneNumber,
            email,
            fullName,
            gender,
            city,
            district,
            ward,
            detailAddress,
          },
          "POST",
        );

        if (res.data) {
          currentProfile = res.data;
          setProfile(res.data);
        }
      } else {
        const updateApi = `/api/customers/${profile.id}`;
        const res = await handleAPI(
          updateApi,
          {
            fullName,
            gender,
            city,
            district,
            ward,
            detailAddress,
          },
          "PATCH",
        );

        if (res.data) {
          currentProfile = res.data;
          setProfile(res.data);
        }
      }

      const appointmentApi = `/api/appointments/customers/${currentProfile.id}`;

      const bookSlotApi = `/api/doctorSchedules/${doctorSchedule.doctorId}`;

      const appointmentRes = await handleAPI(appointmentApi, values, "POST");

      const paymentApi = `/api/payments/payment-at-center`;

      await handleAPI(
        paymentApi,
        {
          totalPrice,
          customerId: currentProfile.id,
          serviceName: service.serviceName,
          appointmentId: appointmentRes.data.appointmentId,
        },
        "POST",
      );

      await handleAPI(
        bookSlotApi,
        {
          slotTime: slot,
          appointmentId: appointmentRes.data.appointmentId,
          appointmentDate: date,
        },
        "PATCH",
      );

      message.success("Tạo cuộc hẹn thành công");
    } catch (error: any) {
      console.error(error);
      message.error(
        error.message || "Đã có lỗi xảy ra, vui lòng thử lại sau ít phút",
      );
    } finally {
      setIsLoadingForm(false);
      form.resetFields();
      setSlot(null);
    }
  };

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
        // const today = dayjs();
        // const formattedToday = today.format("DD/MM/YYYY");
        // const todaySchedule = res.data.weekSchedule.find(
        //   (day: any) => day.dayOfWeek === formattedToday,
        // );
        // if (todaySchedule) {
        //   setDate(today);
        //   setAvailableSlots(todaySchedule.slots);
        // }
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

  const getCustomerByPhoneNumber = async (phoneNumber: string) => {
    try {
      const api = `/api/customers/phoneNumber`;

      const res: any = await handleAPI(api, { phoneNumber }, "POST");

      if (res.message) {
        setProfile(null);
      }

      if (res.data) {
        setProfile(res.data);
        form.resetFields([
          "email",
          "fullName",
          "gender",
          "city",
          "district",
          "ward",
          "detailAddress",
          "distance",
        ]);
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    }
  };

  const getCustomerByEmailAndPhoneNumber = async (
    email: string,
    phoneNumber: string,
  ) => {
    try {
      const api = `/api/users/check-email-with-phoneNumber`;
      const res: any = await handleAPI(api, { email, phoneNumber }, "POST");

      if (res.exists) {
        message.warning("Email này đã được sử dụng bởi người khác!");
        return true;
      }
      return false;
    } catch (error: any) {
      console.log(error);
      message.error(
        error.message || "Có lỗi xảy ra, vui lòng thử lại sau ít phút!",
      );
    }
  };

  useEffect(() => {
    setTotalPrice(0);
    setTotalPrice((prevPrice) => prevPrice + price + transportFee);
  }, [price, transportFee]);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue(profile);
    } else {
      form.resetFields([
        "email",
        "fullName",
        "gender",
        "city",
        "district",
        "ward",
        "detailAddress",
      ]);
    }
  }, [profile]);

  const showConfirmModal = () => {
    Modal.confirm({
      title: "Hãy đảm bảo khách hàng đã thanh toán hóa đơn",
      content: (
        <div>
          Tổng tiền:{" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(totalPrice)}
        </div>
      ),
      onOk: () => {
        form.submit();
      },
      okText: "Xác nhận",
      cancelText: "Hủy",
    });
  };

  const handleDistanceChange = (value: string) => {
    const distanceValue = parseFloat(value);
    if (!isNaN(distanceValue)) {
      const fee = distanceValue * 5000;
      setTransportFee(fee);
    } else {
      setTransportFee(0);
    }
  };

  const handleConsultingChange = (value: string) => {
    if (value === "Tại phòng khám" || value === "Tư vấn trực tuyến") {
      setIsDistanceDisabled(true);
      setTransportFee(0);
      form.setFieldValue("distance", undefined);
    } else {
      setIsDistanceDisabled(false);
    }
  };

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
          <Form
            disabled={isLoadingForm}
            form={form}
            onFinish={handleSubmit}
            size="large"
            layout="vertical"
          >
            <div className="grid grid-cols-[220px_350px_1fr] gap-10">
              <div className="">
                <Form.Item
                  name="serviceName"
                  label="Loại dịch vụ"
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
                    onChange={handleServiceChange}
                  />
                </Form.Item>
                <Form.Item
                  name="doctorId"
                  label="Bác sĩ"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn bác sĩ",
                    },
                  ]}
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
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn hình thức khám",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn hình thức khám"
                    style={{ width: "100%" }}
                    options={consultingOptions}
                    onChange={handleConsultingChange}
                  />
                </Form.Item>
                <div className="mt-20">
                  <h1 className="text-2xl font-semibold">Thanh toán</h1>
                  <Divider />
                  <div className="flex items-center justify-between">
                    <span>Giá dịch vụ:</span>
                    <span>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(price)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Phí di chuyển:</span>
                    <span>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(transportFee)}
                    </span>
                  </div>
                  <Divider />
                  <div className="flex items-center justify-between">
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
              <div className="">
                <Form.Item name="appointmentDate" label="Thời gian khám">
                  <CustomCalendar
                    setDate={handleDateChange}
                    doctorSchedule={doctorSchedule}
                  />
                </Form.Item>
                <Form.Item name="slotTime" className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {availableSlots.map((slotTime: any) => (
                      <Card
                        key={slotTime.slotTime}
                        style={{ width: 60, textAlign: "center" }}
                        onClick={() =>
                          !slotTime.isBooked && setSlot(slotTime.slotTime)
                        }
                        className={
                          slot === slotTime.slotTime
                            ? "bg-[#1677ff] text-white"
                            : !slotTime.isBooked
                              ? "hover:bg-[#1677ff] hover:text-white"
                              : "cursor-not-allowed opacity-50"
                        }
                      >
                        {slotTime.slotTime}
                      </Card>
                    ))}
                  </div>
                </Form.Item>
              </div>
              <div className="">
                <Row gutter={24}>
                  <Col span={12}>
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
                        {
                          validator: async (_, value) => {
                            await getCustomerByPhoneNumber(value);
                            return Promise.resolve();
                          },
                        },
                      ]}
                      validateDebounce={1000}
                    >
                      <Input
                        className="addon-input"
                        addonBefore={
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 30 20"
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                          >
                            <rect
                              width="30"
                              height="20"
                              fill="#da251d"
                              rx={3}
                            />
                            <polygon
                              points="15,4 11.47,14.85 20.71,8.15 9.29,8.15 18.53,14.85"
                              fill="#ff0"
                            />
                          </svg>
                        }
                        placeholder="Số điện thoại"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập email",
                        },
                        {
                          validator: async (_, value) => {
                            // Kiểm tra định dạng email trước
                            if (
                              value &&
                              !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
                            ) {
                              return Promise.reject(
                                "Vui lòng nhập đúng định dạng email!",
                              );
                            }
                            const phoneNumber =
                              form.getFieldValue("phoneNumber");

                            if (value && value.trim().length > 0) {
                              const isExist =
                                await getCustomerByEmailAndPhoneNumber(
                                  value,
                                  phoneNumber,
                                );

                              if (isExist) {
                                return Promise.reject(
                                  "Email này đã có người sử dụng",
                                );
                              }
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                      validateDebounce={1000}
                    >
                      <Input placeholder="Email" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={12}>
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
                      <Input placeholder="Họ và tên" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
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
                </Row>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item name="city" label="Tỉnh">
                      <Select
                        placeholder="Thành phố"
                        value={city}
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
                        value={ward}
                        onChange={(e) => setWard(e)}
                        options={wards}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={16}>
                    <Form.Item name="detailAddress" label="Địa chỉ">
                      <Input
                        placeholder="Địa chỉ"
                        onChange={(e) => {
                          setDetailAddress(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="distance"
                      label="Khoảng cách"
                      rules={[
                        {
                          pattern: /^(?:[0-9]|1[0-9]|20)(\.\d+)?$/,
                          message: "Khoảng cách phải từ 0 đến 20 km",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Khoảng cách"
                        onChange={(e) => handleDistanceChange(e.target.value)}
                        disabled={isDistanceDisabled}
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
                      <TextArea placeholder="Lý do khám" rows={4} />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </div>
          </Form>
          <div className="text-right">
            <Button
              size="large"
              type="primary"
              loading={isLoadingForm}
              onClick={showConfirmModal}
            >
              Tạo cuộc hẹn
            </Button>
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default Booking;
