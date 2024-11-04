import { useEffect, useState } from "react";
import { Button, Card, Rate } from "antd";
import { ArrowRight2 } from "iconsax-react";
import { AnimatedSection, DividerComponent } from "../share";
import Doctor1 from "../assets/doctor1.webp";
import { useNavigate } from "react-router-dom";
// import Doctor2 from "../assets/doctor2.png";

const Doctors = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [doctors] = useState([
    {
      id: "D1",
      name: "Dr. Nguyễn Văn A",
      specialty: "Chuyên gia cá Koi",
      rating: 4.8,
      image: Doctor1,
      description: "Bác sĩ Nguyễn Văn A có hơn 10 năm kinh nghiệm trong lĩnh vực chăm sóc cá Koi.",
    },
    {
      id: "D2",
      name: "Dr. Trần Thị B",
      specialty: "Chuyên gia bệnh lý thủy sinh",
      rating: 4.9,
      image: Doctor1,
      description: "Bác sĩ Trần Thị B là chuyên gia hàng đầu về bệnh lý thủy sinh tại GenKiKoi.",
    },
    // Add more doctors as needed
  ]);

  const handleViewDetails = (doctorId: string) => {
    navigate(`/doctors/${doctorId}`);
  };
  const handleBooking = () => {
    navigate(`/booking`);
  };

  return (
    <div>
      <div className="section bg-green-dark text-center text-white">
        <div className="container mx-auto lg:px-40">
          <AnimatedSection
            variants={{
              hidden: {
                opacity: 0,
                y: 50,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.5 },
              },
            }}
          >
            <div className="mt-10">
              <h1 className="heading-1 mb-5">Đội ngũ bác sĩ tại GenKiKoi</h1>
              <p className="text-lg">
                Gặp gỡ đội ngũ bác sĩ chuyên nghiệp và tận tâm của chúng tôi, luôn sẵn sàng chăm sóc
                cho cá Koi của bạn.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <AnimatedSection
                key={doctor.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 1.5, delay: 0.3 },
                  },
                }}
              >
                <Card
                  hoverable
                  className="bg-blue-primary text-white"
                  cover={
                    <img
                      alt={doctor.name}
                      src={doctor.image}
                      className="h-64 object-cover"
                    />
                  }
                  onClick={() => handleViewDetails(doctor.id)}
                >
                  <Card.Meta title={<span className="text-xl text-white">{doctor.name}</span>} />
                  <p className="mt-4 text-gray-300">{doctor.description}</p>
                  <div className="flex items-center justify-center gap-5">
                    <Button
                      ghost
                      onClick={() => handleViewDetails(doctor.id)}
                      className="mt-4 text-white hover:text-blue-300"
                    >
                      Xem chi tiết <ArrowRight2 size={18} />
                    </Button>
                    <Button
                      ghost
                      onClick={() => handleBooking()}
                      className="mt-4 text-white hover:text-blue-300"
                    >
                      Đặt lịch <ArrowRight2 size={18} />
                    </Button>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
