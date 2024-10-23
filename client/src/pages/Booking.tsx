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

import axios from 'axios';
import { debounce } from 'lodash'; // Thêm import này
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VietNamProvinces from "../../data";
import { handleAPI } from "../apis/handleAPI";
import Map from '../components/Map';
import { CustomerData } from "../models/DataModels";
import { CustomCalendar } from "../share";
import { IAuth } from "../types";

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

// Thêm interface cho options


const Booking = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const auth: IAuth = useSelector((state: any) => state.authReducer.data);

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

  const [service, setService] = useState<any>(null);
  const [price, setPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [addressOptions, setAddressOptions] = useState<{ value: string; label: string }[]>([]);
  const [origin, setOrigin] = useState<L.LatLngExpression | null>(null);
  const [destination] = useState<L.LatLngExpression>([10.8415, 106.8099]); // Tọa độ cố định của Genkikoi
  const [route, setRoute] = useState<L.LatLngExpression[] | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [movingPrice, setMovingPrice] = useState<number>(0);

  // Thêm state để theo dõi input value
  const [searchValue, setSearchValue] = useState<string>('');

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
        console.log(res.data);
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

  const handleSubmit = async (values: any) => {
    try {
      setIsLoadingForm(true);
      const appointmentApi = `/api/appointments/${auth.customerId}`;

      if (date) {
        values.appointmentDate = date;
      }

      if (slot) {
        values.slotTime = demoSlots[slot - 1].time;
      }

      const appointmentRes: any = await handleAPI(appointmentApi, values, "POST");

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
    }
  };

  // Cập nhật hàm handleAddressSearch với debounce
  const handleAddressSearch = debounce(async (value: string) => {
    console.log('Search value:', value);
    if (value.length > 2) {
      try {
        const response = await axios.get(`http://localhost:5000/api/distance/autocomplete`, {
          params: {
            query: value
          },
          headers: {
            'Accept': 'application/json'
          }
        });
        
        console.log('API Response:', response.data);
        
        if (response.data && Array.isArray(response.data.data)) {
          setAddressOptions(response.data.data);
        } else {
          console.log('Invalid response format:', response.data);
          setAddressOptions([]);
        }
      } catch (error: unknown) {
        console.error('Error details:', (error as { response?: { data: unknown } }).response?.data);
        setAddressOptions([]);
      }
    } else {
      setAddressOptions([]);
    }
  }, 300);

  // Cập nhật hàm handleAddressSelect
  const handleAddressSelect = async (value: string) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/distance/calculate-route?address=${encodeURIComponent(value)}`);
        const { origin, route, distance, duration } = response.data;
        
        if (origin && route) {
            setOrigin([origin.lat, origin.lon]);
            setRoute(route); // Đây sẽ là mảng các tọa độ đã được decode
            setDistance(distance);
            setDuration(duration);
            form.setFieldsValue({ address: value });
        }
    } catch (error) {
        console.error('Error calculating route:', error);
        message.error('Không thể tính toán tuyến đường');
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
                    name="doctorName"
                    label="Bác sĩ"
                    required
                  >
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
                    <div className="text-sm text-gray-300 mt-1">
                      (5.000đ/km)
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
                    <CustomCalendar setDate={setDate} />
                  </Form.Item>
                  <Form.Item
                    name="slotTime"
                    className="mt-5"
                  >
                    <div className="flex flex-wrap gap-4">
                      {demoSlots.map((slotTime) => (
                        <ConfigProvider
                          theme={{
                            components: {
                              Card: {
                                paddingLG: 5,
                              },
                            },
                          }}
                        >
                          <Card
                            key={slotTime.id}
                            style={{ width: 70, textAlign: "center" }}
                            onClick={() => setSlot(slotTime.id)}
                            className={
                              slot === slotTime.id
                                ? "bg-green-dark text-white"
                                : "hover:bg-green-dark hover:text-white"
                            }
                          >
                            {slotTime.time}
                          </Card>
                        </ConfigProvider>
                      ))}
                    </div>
                  </Form.Item>
                  <p className="text-justify text-base text-white">
                    Lưu ý: Thời gian khám trên chỉ là thời gian dự kiến, tổng đài sẽ liên hệ xác
                    nhận thời gian khám chính xác tới quý khách sau khi quý khách đặt hẹn.
                  </p>
                </div>
                <div className="lg:flex-1">
                  <Row gutter={24}>
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
                        name="address"
                        label="Địa chỉ"
                      >
                        <AutoComplete
                          value={searchValue}
                          options={addressOptions}
                          onSearch={handleAddressSearch}
                          onSelect={handleAddressSelect}
                          placeholder="Nhập địa chỉ"
                          style={{ width: '100%' }}
                          notFoundContent={searchValue.length > 2 ? "Không tìm thấy địa chỉ" : "Nhập ít nhất 3 ký tự"}
                          defaultActiveFirstOption={true}
                          allowClear={true}
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
                  {distance && duration && (
                    <Row>
                      <Col span={24}>
                        <p>Khoảng cách: {distance}</p>
                        <p>Thời gian ước tính: {duration}</p>
                      </Col>
                    </Row>
                  )}
                  <Row>
                    <Col span={24}>
                      <Map origin={origin} destination={destination} route={route} />
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
