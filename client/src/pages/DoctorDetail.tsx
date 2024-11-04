import { Avatar, Button, Card, ConfigProvider } from "antd";
import { ArrowRight2 } from "iconsax-react";
import { AnimatedSection } from "../share";
import Doctor1 from "../assets/doctor1.webp";
import { useEffect } from "react";

const DoctorDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-screen bg-green-dark text-white">
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
                  src={Doctor1}
                  className="mb-4"
                />
                <h1 className="heading-3 mb-2">Bác sĩ Nguyễn Văn A</h1>
                <h2 className="mb-4 text-xl font-bold">Chuyên gia cá Koi</h2>
                <p className="mb-4 text-lg">
                  Với hơn 10 năm kinh nghiệm trong lĩnh vực chăm sóc và điều trị bệnh cho cá Koi,
                  Bác sĩ Nguyễn Văn A là một trong những chuyên gia hàng đầu tại Việt Nam về lĩnh
                  vực này.
                </p>
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
