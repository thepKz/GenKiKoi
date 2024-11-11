import { Avatar, Button, Card, message, Spin } from "antd";
import { ArrowRight2, User } from "iconsax-react";
import { useEffect, useState } from "react";
import Doctor1 from "../assets/doctor1.webp";
import { AnimatedSection } from "../share";
import { useLocation } from "react-router-dom";
import { handleAPI } from "../apis/handleAPI";

const DoctorDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { pathname } = useLocation();
  const doctorId = pathname.split("/")[2];

  const [doctor, setDoctor] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDoctor = async () => {
      try {
        setIsLoading(true);
        const api = `/api/doctors/${doctorId}`;

        const res = await handleAPI(api, undefined, "GET");

        if (res.data) {
          setDoctor(res.data);
        }
      } catch (error: any) {
        console.log(error);
        message.error(error.message || "Đã có lỗi xảy ra vui lòng thử lại sau ít phút");
      } finally {
        setIsLoading(false);
      }
    };
    getDoctor();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-t from-[#2A7F9E] to-[#175670]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="h-min-screen bg-green-dark pb-10 text-white">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left column */}
          <div className="lg:w-1/3">
            <div className="sticky pt-32">
              <AnimatedSection
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.5, delay: 0.5 } },
                }}
              >
                <Avatar
                  size={200}
                  src={doctor?.photoUrl}
                  icon={<User size={150} />}
                  className="mb-4"
                />
                <h1 className="heading-3 mb-2">Bác sĩ {doctor?.fullName}</h1>
                <h2 className="mb-4 text-xl font-bold">Chuyên gia chăm sóc sức khỏe cá Koi</h2>
                <p className="mb-4 text-justify text-lg">{doctor?.introduction}</p>
                <Button
                  type="primary"
                  size="large"
                  className="mt-4 flex items-center"
                  ghost
                >
                  Đặt lịch hẹn
                  <ArrowRight2 size={18} />
                </Button>
              </AnimatedSection>
            </div>
          </div>

          {/* Right column */}
          <div className="pb-28 pt-32 lg:w-2/3">
            {/* Specialties section */}
            <AnimatedSection
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 1.5, delay: 0.5 } },
              }}
            >
              <h2 className="heading-2 mb-6">Chuyên môn</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="bg-blue-primary text-white">
                  <h3 className="mb-2 text-xl font-bold">Điều trị bệnh cá Koi</h3>
                  <p>Chuyên sâu về chẩn đoán và điều trị các bệnh phổ biến ở cá Koi.</p>
                </Card>
                <Card className="bg-blue-primary text-white">
                  <h3 className="mb-2 text-xl font-bold">Quản lý chất lượng nước</h3>
                  <p>Kiểm soát và duy trì chất lượng nước tối ưu cho cá Koi.</p>
                </Card>
                <Card className="bg-blue-primary text-white">
                  <h3 className="mb-2 text-xl font-bold">Tư vấn dinh dưỡng</h3>
                  <p>Xây dựng chế độ dinh dưỡng phù hợp cho từng loại cá Koi.</p>
                </Card>
                <Card className="bg-blue-primary text-white">
                  <h3 className="mb-2 text-xl font-bold">Phẫu thuật cá Koi</h3>
                  <p>Thực hiện các ca phẫu thuật phức tạp cho cá Koi.</p>
                </Card>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
