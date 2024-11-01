import { HeaderPage } from "../../components";
import { Calendar, Diagram, Profile2User } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { Line } from "@antv/g2plot";
import { handleAPI } from "../../apis/handleAPI";
import { message, Spin } from "antd";

const Dashboard = () => {
  const appointmentChartRef = useRef<any>(null);
  const revenueChartRef = useRef<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalEarning, setTotalEarning] = useState<number>(0);
  const [totalBooking, setTotalBooking] = useState<number>(0);
  const [totalCustomers, setTotalCustomers] = useState<number>(0);
  const [topServices, setTopServices] = useState<any>([]);
  const [topCustomers, setTopCustomers] = useState<any>([]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const apiEaringAndBooking = `/api/payments/statistics`;
        const apiTotalCustomers = `/api/customers/total`;
        const apiTopServices = `/api/payments/top-services`;
        const apiTopCustomers = `/api/payments/top-customers`;

        const resEaringAndBooking = await handleAPI(
          apiEaringAndBooking,
          undefined,
          "GET",
        );

        const resTotalCustomers = await handleAPI(
          apiTotalCustomers,
          undefined,
          "GET",
        );

        const resTopServices = await handleAPI(
          apiTopServices,
          undefined,
          "GET",
        );

        const resTopCustomers = await handleAPI(
          apiTopCustomers,
          undefined,
          "GET",
        );

        if (resEaringAndBooking.data) {
          setTotalEarning(resEaringAndBooking.data.totalEarning);
          setTotalBooking(resEaringAndBooking.data.totalBooking);
        }

        if (resTotalCustomers.data) {
          setTotalCustomers(resTotalCustomers.data.totalCustomers);
        }

        if (resTopServices.data) {
          setTopServices(resTopServices.data);
        }

        if (resTopCustomers.data) {
          setTopCustomers(resTopCustomers.data);
        }
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    // Dữ liệu cho biểu đồ số lượng cuộc hẹn
    const appointmentData = [
      { month: "T1", value: 65 },
      { month: "T2", value: 59 },
      { month: "T3", value: 80 },
      { month: "T4", value: 81 },
      { month: "T5", value: 56 },
      { month: "T6", value: 55 },
      { month: "T7", value: 40 },
      { month: "T8", value: 50 },
      { month: "T9", value: 60 },
      { month: "T10", value: 70 },
      { month: "T11", value: 80 },
      { month: "T12", value: 90 },
    ];

    // Dữ liệu cho biểu đồ doanh thu
    const revenueData = [
      { month: "T1", value: 150 },
      { month: "T2", value: 200 },
      { month: "T3", value: 180 },
      { month: "T4", value: 220 },
      { month: "T5", value: 250 },
      { month: "T6", value: 280 },
      { month: "T7", value: 300 },
      { month: "T8", value: 350 },
      { month: "T9", value: 400 },
      { month: "T10", value: 380 },
      { month: "T11", value: 420 },
      { month: "T12", value: 450 },
    ];

    // Tạo biểu đồ số lượng cuộc hẹn
    const appointmentChart = new Line(appointmentChartRef.current, {
      data: appointmentData,
      xField: "month",
      yField: "value",
      seriesField: "type",
      smooth: true,
      xAxis: {
        title: { text: "Tháng" },
      },
      yAxis: {
        title: { text: "Số lượng cuộc hẹn" },
      },
      tooltip: {
        showMarkers: false,
      },
      point: {
        size: 5,
        shape: "diamond",
        style: {
          fill: "white",
          stroke: "#5B8FF9",
          lineWidth: 2,
        },
      },
    });

    appointmentChart.render();

    // Tạo biểu đồ doanh thu
    const revenueChart = new Line(revenueChartRef.current, {
      data: revenueData,
      xField: "month",
      yField: "value",
      seriesField: "type",
      smooth: true,
      xAxis: {
        title: { text: "Tháng" },
      },
      yAxis: {
        title: { text: "Doanh thu (triệu đồng)" },
      },
      tooltip: {
        showMarkers: false,
      },
      point: {
        size: 5,
        shape: "diamond",
        style: {
          fill: "white",
          stroke: "#F4664A",
          lineWidth: 2,
        },
      },
    });

    revenueChart.render();

    // Cleanup function
    return () => {
      appointmentChart.destroy();
      revenueChart.destroy();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="section flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="section dashboard">
      <HeaderPage heading="Bảng điều khiển" />
      <div className="h-[calc(100vh-150px)] overflow-y-auto p-1">
        <div className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="relative flex items-center overflow-hidden rounded-lg bg-white p-6 shadow">
              <div className="mr-4">
                <Diagram size="32" color="#FF8A65" />
              </div>
              <div>
                <h3 className="text-sm text-gray-600">Tổng doanh thu</h3>
                <p className="text-xl font-semibold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalEarning)}
                </p>
              </div>
            </div>
            <div className="relative flex items-center overflow-hidden rounded-lg bg-white p-6 shadow">
              <div className="mr-4">
                <Calendar size="32" color="rgb(59 130 246)" />
              </div>
              <div>
                <h3 className="text-sm text-gray-600">Tổng đặt lịch</h3>
                <p className="text-xl font-semibold">{totalBooking}</p>
              </div>
            </div>
            <div className="relative flex items-center overflow-hidden rounded-lg bg-white p-6 shadow">
              <div className="mr-4">
                <Profile2User size="32" color="rgb(168 85 247)" />
              </div>
              <div>
                <h3 className="text-sm text-gray-600">Tổng khách hàng</h3>
                <p className="text-xl font-semibold">{totalCustomers}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Dịch vụ hàng đầu</h2>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="pb-2">#</th>
                  <th className="pb-2">Tên</th>
                  <th className="pb-2 pr-2">Độ phổ biến</th>
                  <th className="pb-2">Doanh số</th>
                </tr>
              </thead>
              <tbody>
                {topServices.map((service: any, index: number) => (
                  <tr key={index + 1}>
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">{service?.serviceName}</td>
                    <td className="py-2 pr-2">
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className={`h-2 rounded-full bg-blue-400`}
                          style={{ width: `${service?.percentage}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="py-2">
                      <span
                        className={`rounded-full bg-blue-600 px-2 py-1 text-xs text-white`}
                      >
                        {service?.percentage}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Khách hàng VIP</h2>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="pb-2">#</th>
                  <th className="pb-2">Tên</th>
                  <th className="pb-2">Tổng số tiền</th>
                  <th className="pb-2">Số lần sử dụng</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map((customer: any, index: number) => (
                  <tr key={index + 1}>
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">{customer.customerName}</td>
                    <td className="py-2 font-bold">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(customer.totalAmount)}
                    </td>
                    <td className="py-2">
                      <span className="rounded-full px-2 py-1 font-bold">
                        {customer.orderCount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Số lượng cuộc hẹn</h2>
            <div ref={appointmentChartRef} style={{ height: "400px" }}></div>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Doanh thu</h2>
            <div ref={revenueChartRef} style={{ height: "400px" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
