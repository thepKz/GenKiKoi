/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AutoComplete,
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
  Spin,
} from "antd";

import dayjs from "dayjs";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleAPI } from "../apis/handleAPI";
import Map from "../components/Map";
import { CustomCalendar } from "../share";
import { IAuth } from "../types";

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
  const [profile, setProfile] = useState<any | null>(null);

  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [consultingOptions, setConsultingOptions] = useState([]);

  const [service, setService] = useState<any>(null);
  const [price, setPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [doctorSchedule, setDoctorSchedule] = useState<any>(null);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);

  const [addressOptions, setAddressOptions] = useState<{ value: string; label: string }[]>([]);
  const [origin, setOrigin] = useState<L.LatLngExpression | null>(null);
  const [destination] = useState<L.LatLngExpression>([10.8415, 106.8099]); // Tọa độ cố định của Genkikoi
  const [route, setRoute] = useState<L.LatLngExpression[] | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [movingPrice, setMovingPrice] = useState<number>(0);

  const [isAddressDisabled, setIsAddressDisabled] = useState(false);

  console.log(profile);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setIsLoading(true);
        const api = `api/users/`;
        const res = await handleAPI(api, undefined, "GET");
        setProfile(res.data);
        form.setFieldsValue(res.data);
      } catch (error) {
        console.log(error);
        message.error("Có lỗi xảy ra khi tải thông tin người dùng.");
      } finally {
        setIsLoading(false);
      }
    };
    getProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
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

  useEffect(() => {
    if (distance) {
      const distanceInKm = parseFloat(distance);
      const pricePerKm = 5000; // 5.000 VNĐ/km
      const calculatedPrice = distanceInKm * pricePerKm;

      // Làm tròn đến hàng nghìn
      setMovingPrice(Math.round(calculatedPrice / 1000) * 1000);
    }
  }, [distance]);

  useEffect(() => {
    setTotalPrice(price + movingPrice);
  }, [price, movingPrice]);

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
        const today = dayjs();
        const formattedToday = today.format("DD/MM/YYYY");
        const todaySchedule = res.data.weekSchedule.find(
          (day: any) => day.dayOfWeek === formattedToday,
        );
        if (todaySchedule) {
          setDate(today);
          setAvailableSlots(todaySchedule.slots);
        }
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

  const handleSubmit = async (values: any) => {
    try {
      setIsLoadingForm(true);
      const { fullName, phoneNumber, gender } = values;

      const appointmentApi = `/api/appointments/customers/${auth.customerId}`;
      const bookSlotApi = `/api/doctorSchedules/${doctorSchedule.doctorId}`;
      const profileApi = `/api/users/update-profile`;

      if (date && slot && doctorSchedule) {
        values.appointmentDate = date.format("YYYY-MM-DD");
        values.doctorScheduleId = doctorSchedule._id;
        values.slotTime = slot;
      } else {
        message.error("Vui lòng chọn ngày và giờ khám");
        return;
      }

      await handleAPI(profileApi, { fullName, phoneNumber, gender }, "PATCH");

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
          window.location.href = paymentRes.data.checkoutUrl;
        } else {
          message.error("Không thể lấy liên kết thanh toán");
        }
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleAddressSearch = debounce(async (value: string) => {
    if (value.length > 2) {
      try {
        const api = `/api/distance/autocomplete`;
        const res = await handleAPI(api, undefined, "GET", { query: value });

        if (Array.isArray(res.data)) {
          setAddressOptions(res.data);
        } else {
          setAddressOptions([]);
        }
      } catch (error: any) {
        console.log(error);
        message.error(error.message || "Có lỗi xảy ra khi tìm kiếm địa chỉ");
        setAddressOptions([]);
      }
    } else {
      setAddressOptions([]);
    }
  }, 300);

  const handleAddressSelect = async (value: string) => {
    try {
      const api = `/api/distance/calculate-route`;
      const { data } = await handleAPI(api, undefined, "GET", { address: value });

      if (data.origin && data.route) {
        setOrigin([data.origin.lat, data.origin.lon]);
        setRoute(data.route);
        setDistance(data.distance);
        form.setFieldsValue({ detailAddress: value });
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message || "Không thể tính toán tuyến đường");
    }
  };

  const handleConsultingTypeChange = (value: string) => {
    if (value === "Tư vấn trực tuyến" || value === "Tại phòng khám") {
      setIsAddressDisabled(true);
      form.setFieldsValue({ detailAddress: "" });
    } else {
      setIsAddressDisabled(false);
    }
  };

  const handleCheckExistence = async (field: string, value: string) => {
    const api = `/api/users/check-${field}`;
    try {
      const res: any = await handleAPI(api, { [field]: value }, "POST");

      if (res.exists && res.userId !== auth.id) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
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
              <div className="my-5 flex gap-5">
                <div className="lg:w-1/5">
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
                      onChange={handleConsultingTypeChange}
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
                      <span>Phí di chuyển ({distance} km):</span>
                      <span>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(movingPrice)}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-300">(5.000đ/km)</div>
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
                <div className="lg:w-[50%]">
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        required
                        name="fullName"
                        label="Họ và tên"
                        tooltip="Chỉ chữ cái và khoảng trắng, dài từ 2 đến 50 ký tự!"
                        rules={[
                          { required: true, message: "Vui lòng nhập họ và tên" },
                          { min: 2, message: "Họ và tên phải có ít nhất 2 ký tự" },
                          { max: 50, message: "Họ và tên không được vượt quá 50 ký tự" },
                          {
                            pattern: /^[a-zA-ZÀ-ỹ\s]+$/,
                            message: "Họ và tên chỉ được chứa chữ cái và khoảng trắng",
                          },
                          {
                            validator: (_, value) => {
                              if (value && value.trim().split(/\s+/).length < 2) {
                                return Promise.reject("Họ và tên phải bao gồm ít nhất hai từ");
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                        validateDebounce={1000}
                      >
                        <Input placeholder="Họ và tên" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        required
                        name="phoneNumber"
                        label="Số điện thoại"
                        hasFeedback
                        rules={[
                          { required: true, message: "Vui lòng nhập số điện thoại" },
                          { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ" },
                          {
                            validator: async (_, value) => {
                              const exists = await handleCheckExistence("phoneNumber", value);
                              if (exists) {
                                return Promise.reject(
                                  new Error("Tên số điện thoại này đã tồn tại!"),
                                );
                              }

                              return Promise.resolve();
                            },
                          },
                        ]}
                        validateDebounce={1000}
                      >
                        <Input
                          className="addon-input"
                          addonBefore="+84"
                          placeholder="Số điện thoại"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
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
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        name="detailAddress"
                        label="Địa chỉ"
                      >
                        <AutoComplete
                          options={addressOptions}
                          onSearch={handleAddressSearch}
                          onSelect={handleAddressSelect}
                          placeholder="Nhập địa chỉ"
                          style={{ width: "100%" }}
                          notFoundContent={"Nhập ít nhất 3 ký tự"}
                          defaultActiveFirstOption={true}
                          allowClear={true}
                          disabled={isAddressDisabled}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Map
                        origin={origin}
                        destination={destination}
                        route={route}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </Form>
            <div className="">
              <h1 className="text-2xl font-semibold text-white">Lưu ý</h1>
              <p className="w-1/2 text-justify text-white">
                Khi quý khách thanh toán thành công cho dịch vụ tư vấn trực tuyến, đường link tham
                gia cuộc hẹn sẽ được gửi qua email trong vòng 2 giờ. <br />
                Xin quý khách vui lòng kiểm tra email để nhận thông tin cuộc hẹn!
              </p>
            </div>
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
