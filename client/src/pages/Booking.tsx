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
  Modal,
  Row,
  Select,
  Spin,
} from "antd";

import dayjs from "dayjs";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
  const [isOutOfRange, setIsOutOfRange] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const checkInitialAddress = async () => {
      const currentAddress = form.getFieldValue("detailAddress");
      if (currentAddress && !isAddressDisabled) {
        await handleAddressSelect(currentAddress);
      }
    };
    checkInitialAddress();
  }, []);

  const showModal = async () => {
    try {
      await form.validateFields();

      if (!date || !slot || !doctorSchedule) {
        message.error("Vui lòng chọn đầy đủ ngày và giờ khám");
        return;
      }

      setIsModalVisible(true);
    } catch (error) {
      const errorFields = (error as any).errorFields;
      if (errorFields?.length) {
        message.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        setIsLoading(true);
        const api = `api/users/`;
        const res = await handleAPI(api, undefined, "GET");
        form.setFieldsValue({
          ...res.data,
          detailAddress: "",
        });
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

  const handleSubmit = async (values: any) => {
    try {
      setIsLoadingForm(true);
      const { fullName, phoneNumber, gender, detailAddress } = values;

      const appointmentApi = `/api/appointments/customers/${auth.customerId}`;
      const bookSlotApi = `/api/doctorSchedules/${doctorSchedule.doctorId}`;
      const profileApi = `/api/users/update-profile`;

      values.appointmentDate = date?.format("YYYY-MM-DD");
      values.doctorScheduleId = doctorSchedule._id;
      values.slotTime = slot;

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
      setIsModalVisible(false);
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

        // Kiểm tra khoảng cách
        const distanceInKm = parseFloat(data.distance);
        if (distanceInKm > 20) {
          setIsOutOfRange(true);
          message.error("Khu vực này không được hỗ trợ dịch vụ tại GenKiKoi (>20km)");
        } else {
          setIsOutOfRange(false);
        }
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
      setMovingPrice(0);
      setIsOutOfRange(false); // Reset trạng thái khi chọn dịch vụ không cần địa chỉ
    } else {
      setIsAddressDisabled(false);
      // Kiểm tra lại địa chỉ hiện tại nếu có
      const currentAddress = form.getFieldValue("detailAddress");
      if (currentAddress && distance) {
        const distanceInKm = parseFloat(distance);
        setIsOutOfRange(distanceInKm > 20);
      }
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
    <div className="lg:pt-30 booking min-h-screen bg-gradient-to-t from-[#2A7F9E] to-[#175670] pb-20 pt-32">
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
                          {
                            pattern: /^(0[3|5|7|8|9])+([0-9]{8})\b/,
                            message: "Số điện thoại không hợp lệ",
                          },
                          {
                            validator: async (_, value) => {
                              if (value && value.trim().length > 0) {
                                const exists = await handleCheckExistence("phoneNumber", value);
                                if (exists) {
                                  return Promise.reject(
                                    new Error("Tên số điện thoại này đã tồn tại!"),
                                  );
                                }
                              }

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
                        required={!isAddressDisabled}
                        rules={[
                          !isAddressDisabled
                            ? {
                                required: true,
                                message: "Vui lòng nhập địa chỉ",
                              }
                            : {},
                        ]}
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
                components: {
                  Button: {
                    colorPrimary: "#2196F3", // Màu xanh dương cho trạng thái bình thường
                    colorPrimaryHover: "#1976D2", // Màu hover
                    colorPrimaryActive: "#1976D2", // Màu active
                    colorBgContainerDisabled: "rgba(33, 150, 243, 0.5)", // Màu nền mờ
                    colorTextDisabled: "rgba(255, 255, 255, 0.8)", // Màu chữ mờ
                  },
                },
              }}
            >
              <Button
                size="large"
                type="primary"
                className={`mt-3 w-fit transition-all duration-300 ${
                  isOutOfRange || (!isAddressDisabled && !form.getFieldValue("detailAddress"))
                    ? "cursor-not-allowed opacity-70 hover:opacity-70"
                    : "hover:-translate-y-0.5 hover:shadow-lg"
                }`}
                onClick={showModal}
                disabled={
                  isOutOfRange || (!isAddressDisabled && !form.getFieldValue("detailAddress"))
                }
              >
                Thanh toán
              </Button>
            </ConfigProvider>
          </div>
        </div>
      </div>
      <ConfigProvider
        theme={{
          inherit: false,
          token: {
            fontFamily: "Pro-Rounded",
          },
          components: {
            Divider: {
              marginLG: 10,
            },
          },
        }}
      >
        <Modal
          open={isModalVisible}
          onOk={() => form.submit()}
          onCancel={handleCancel}
          okText="Đồng ý"
          confirmLoading={isLoadingForm}
          cancelText="Thoát"
        >
          <div className="py-4">
            <h1 className="heading-4">Xác nhận thanh toán</h1>
            <Divider />
            <p className="mb-2 text-base">
              Quý khách vui lòng tham khảo trước các{" "}
              <Link
                to="/terms-of-service"
                className="text-blue-600"
                target="_blank"
              >
                điều khoản của công ty.
              </Link>
            </p>
            <ol className="ml-5 flex list-decimal flex-col gap-2 text-base">
              <li>
                <span className="font-semibold">Đặt lịch:</span> Khách hàng có thể đặt lịch hẹn
                thông qua website, ứng dụng hoặc gọi điện trực tiếp.
              </li>
              <li>
                <span className="font-semibold">Hủy lịch hẹn:</span> Việc hủy hoặc thay đổi lịch hẹn
                phải được thực hiện ít nhất 30 phút trước giờ hẹn.
              </li>
              <li>
                <span className="font-semibold">Chính sách hoàn tiền:</span>
                <ol className="ml-5 list-disc">
                  <li>
                    <span className="font-semibold">Hủy lịch hẹn trước 30 phút:</span> Hoàn tiền
                    100%.
                  </li>
                  <li>
                    <span className="font-semibold">Không đến mà không báo trước:</span> Không hoàn
                    tiền.
                  </li>
                </ol>
              </li>
            </ol>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default Booking;
