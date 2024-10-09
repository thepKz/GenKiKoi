import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Form,
  Input,
  message,
  Row,
  Select,
  SelectProps,
  Spin,
} from "antd";

import { useEffect, useState } from "react";
import { CustomerData } from "../models/DataModels";
import VietNamProvinces from "../../data";
import { handleAPI } from "../apis/handleAPI";
import { CustomCalendar } from "../share";

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

const Booking = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form] = Form.useForm();
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [slot, setSlot] = useState<number | null>(null);
  const [date, setDate] = useState<string>("");
  const [consultingOptions, setConsultingOptions] = useState([]);

  const [city, setCity] = useState<String>("");
  const [district, setDistrict] = useState<String>("");
  const [ward, setWard] = useState<String>("");

  const [cities, setCities] = useState<SelectProps["options"]>([]);
  const [districts, setDistricts] = useState<SelectProps["options"]>([]);
  const [wards, setWards] = useState<SelectProps["options"]>([]);
  const [profile, setProfile] = useState<CustomerData | null>(null);

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

  const handleServiceChange = (value: string) => {
    let options: any = [];
    switch (value) {
      case "Tư vấn & Điều trị":
        options = [
          { value: "Tại phòng khám", label: "Tại phòng khám" },
          { value: "Tại nhà", label: "Tại nhà" },
          { value: "Tư vấn trực tuyến", label: "Tư vấn trực tuyến" },
        ];
        break;
      case "Xét nghiệm":
        options = [{ value: "Tại phòng khám", label: "Tại phòng khám" }];
        break;
      case "Tiêm ngừa":
        options = [{ value: "Tại phòng khám", label: "Tại phòng khám" }];
        break;
      case "Đánh giá chất lượng hồ cá":
        options = [{ value: "Tại nhà", label: "Tại nhà" }];
        break;
      case "Đánh giá chất lượng nước":
        options = [
          { value: "Tại nhà", label: "Tại nhà" },
          { value: "Tại phòng khám", label: "Tại phòng khám" },
        ];
        break;
      default:
        options = [];
    }
    setConsultingOptions(options);
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
      <div className="flex h-screen items-center justify-center bg-green-dark">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-green-dark py-36 pb-16 text-white">
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
                        options={[
                          { value: "Tư vấn & Điều trị", label: "Tư vấn & Điều trị" },
                          { value: "Xét nghiệm", label: "Xét nghiệm" },
                          { value: "Tiêm ngừa", label: "Tiêm ngừa" },
                          {
                            value: "Đánh giá chất lượng hồ cá",
                            label: "Đánh giá chất lượng hồ cá",
                          },
                          { value: "Đánh giá chất lượng nước", label: "Đánh giá chất lượng nước" },
                        ]}
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
                        options={[
                          { value: "Đỗ Thị Mỹ Uyên", label: "Bs. Đỗ Thị Mỹ Uyên" },
                          { value: "Mai Tấn Thép", label: "Bs. Mai Tấn Thép" },
                        ]}
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
                              { value: "nữ", label: "Nữ" },
                              { value: "nam", label: "Nam" },
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
                          required
                          name="reasons"
                          label="Lý do khám"
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
                  Gửi thông tin
                </Button>
              </ConfigProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
