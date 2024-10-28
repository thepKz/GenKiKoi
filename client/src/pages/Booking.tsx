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
  SelectProps,
  Spin,
} from "antd";

import axios from "axios";
import { debounce } from "lodash"; // Thêm import này
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VietNamProvinces from "../../data";
import { handleAPI } from "../apis/handleAPI";
import Map from "../components/Map";
import { CustomerData } from "../models/DataModels";
import { CustomCalendar } from "../share";
import { IAuth } from "../types";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const Booking = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

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

  const [addressOptions, setAddressOptions] = useState<{ value: string; label: string }[]>([]);
  const [origin, setOrigin] = useState<L.LatLngExpression | null>(null);
  const [destination] = useState<L.LatLngExpression>([10.8415, 106.8099]); // Tọa độ cố định của Genkikoi
  const [route, setRoute] = useState<L.LatLngExpression[] | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [movingPrice, setMovingPrice] = useState<number>(0);

  // Thêm state để theo dõi input value
  const [searchValue, setSearchValue] = useState<string>("");

  const [isAddressDisabled, setIsAddressDisabled] = useState(false);

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
        if (!res.data.phoneNumber || !res.data.gender || !res.data.fullName) {
          navigate("/my-account/profile");
        }
      } catch (error) {
        console.log(error);
        message.error("Có lỗi xảy ra khi tải thông tin người dùng.");
      } finally {
        setIsLoading(false);
      }
    };
    getProfile();
  }, [navigate]);

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

  // Cập nhật useEffect cho tổng giá
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
          message.error("Không thể từo liên kết thanh toán");
        }
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    } finally {
      setIsLoadingForm(false);
      setSlot(null);
      setDate(null);
      form.resetFields();
    }
  };

  console.log(auth);

  // Cập nhật hàm handleAddressSearch với debounce
  const handleAddressSearch = debounce(async (value: string) => {
    console.log("Search value:", value);
    if (value.length > 2) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/distance/autocomplete`,
          {
            params: {
              query: value,
            },
            headers: {
              Accept: "application/json",
            },
          },
        );

        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data.data)) {
          setAddressOptions(response.data.data);
        } else {
          console.log("Invalid response format:", response.data);
          setAddressOptions([]);
        }
      } catch (error: unknown) {
        console.error("Error details:", (error as { response?: { data: unknown } }).response?.data);
        setAddressOptions([]);
      }
    } else {
      setAddressOptions([]);
    }
  }, 300);

  // Cập nhật hàm handleAddressSelect
  const handleAddressSelect = async (value: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/distance/calculate-route?address=${encodeURIComponent(value)}`,
      );
      const { origin, route, distance, duration } = response.data;

      if (origin && route) {
        setOrigin([origin.lat, origin.lon]);
        setRoute(route); // Đây sẽ là mảng các tọa độ đã được decode
        setDistance(distance);
        setDuration(duration);
        form.setFieldsValue({ address: value });
      }
    } catch (error) {
      console.error("Error calculating route:", error);
      message.error("Không thể tính toán tuyến đường");
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
                <div className="lg:w-[45%]">
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
                          value={searchValue}
                          options={addressOptions}
                          onSearch={handleAddressSearch}
                          onSelect={handleAddressSelect}
                          placeholder="Nhập địa chỉ"
                          style={{ width: "100%" }}
                          notFoundContent={
                            searchValue.length > 2
                              ? "Không tìm thấy địa chỉ"
                              : "Nhập ít nhất 3 ký tự"
                          }
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
