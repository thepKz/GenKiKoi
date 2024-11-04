
import { Button, Card, Rate } from 'antd';
import { ArrowRight2 } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Doctor1 from "../assets/doctor1.webp";
import { AnimatedSection, DividerComponent } from "../share";

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
      <div className="section bg-gradient-to-t from-[#2A7F9E] to-[#175670] py-36 pt-44 text-center text-white">
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

            <div className='mb-10'>
              <h1 className="text-4xl lg:text-5xl font-bold text-center leading-tight mb-8 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Đội ngũ bác sĩ tại GenKiKoi
              </h1>

              <p className="text-lg">
                Gặp gỡ đội ngũ bác sĩ chuyên nghiệp và tận tâm của chúng tôi, luôn sẵn sàng chăm sóc
                cho cá Koi của bạn.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

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
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 text-white overflow-hidden"
                  cover={
                    <div className="overflow-hidden">
                      <img
                        alt={doctor.name}
                        src={doctor.image}
                        className="h-64 w-full object-cover transition-all duration-500 
                          opacity-90 contrast-125 brightness-90 saturate-[0.85]
                          hover:opacity-100 hover:contrast-100 hover:brightness-100 hover:saturate-100
                          hover:scale-110 transform"
                      />
                    </div>
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
                  <div className="flex gap-4 mt-4">
                    <Button 
                      onClick={() => handleViewDetails(doctor.id)} 
                      className="bg-white/10 hover:bg-white/20 text-white border-none rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                      Xem chi tiết <ArrowRight2 size={18} />
                    </Button>
                    <Button 
                      onClick={() => handleBooking()} 
                      className="bg-white/10 hover:bg-white/20 text-white border-none rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                      Đặt lịch <ArrowRight2 size={18} />
                    </Button>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 1, delay: 0.5 },
              },
            }}
            className="mt-12"
          >
            <Button
              size="large"
              className="mx-auto px-8 py-6 bg-white/10 hover:bg-white/20 text-white border-none rounded-full text-lg font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105"
            >
              Xem tất cả bác sĩ 
              <ArrowRight2 className="animate-bounce" size={20} />
            </Button>
          </AnimatedSection>

        </div>
      </div>
    </div>
  );
};

export default Doctors;
