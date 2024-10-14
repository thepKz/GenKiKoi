import React, { useEffect, useState } from 'react';
import { Button, Card, Avatar, Rate } from 'antd';
import { ArrowRight2 } from 'iconsax-react';
import { AnimatedSection, DividerComponent } from "../share";
import Doctor1 from "../assets/doctor1.webp";
// import Doctor2 from "../assets/doctor2.png";



const Doctors = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: 'Dr. Nguyễn Văn A',
      specialty: 'Chuyên gia cá Koi',
      rating: 4.8,
      image: Doctor1,
      description: 'Bác sĩ Nguyễn Văn A có hơn 10 năm kinh nghiệm trong lĩnh vực chăm sóc cá Koi.',
    },
    {
      id: 2,
      name: 'Dr. Trần Thị B',
      specialty: 'Chuyên gia bệnh lý thủy sinh',
      rating: 4.9,
      image: Doctor1,
      description: 'Bác sĩ Trần Thị B là chuyên gia hàng đầu về bệnh lý thủy sinh tại GenKiKoi.',
    },
    // Add more doctors as needed
  ]);

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
                transition: { duration: 1.5, delay: 0.5 },
              },
            }}
          >
            <div className='mt-10'>
              <h1 className="heading-1 mb-5">Đội ngũ bác sĩ tại GenKiKoi</h1>
              <p className="text-lg">
                Gặp gỡ đội ngũ bác sĩ chuyên nghiệp và tận tâm của chúng tôi, luôn sẵn sàng chăm sóc cho cá Koi của bạn.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <AnimatedSection
                key={doctor.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5, delay: 0.3 },
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
                >
                  <Card.Meta
                    title={<span className="text-white text-xl">{doctor.name}</span>}
                    description={
                      <div className="text-gray-300">
                        <p>{doctor.specialty}</p>
                        <Rate disabled defaultValue={doctor.rating} className="text-yellow-400" />
                      </div>
                    }
                  />
                  <p className="mt-4 text-gray-300">{doctor.description}</p>
                  <Button type="link" className="mt-4 text-white hover:text-blue-300">
                    Xem chi tiết <ArrowRight2 size={18} />
                  </Button>
                  <Button type="link" className="mt-4 text-white hover:text-blue-300">
                    Đặt lịch <ArrowRight2 size={18} />
                  </Button>
                </Card>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection
            variants={{
              hidden: {
                opacity: 0,
                scale: 0.5,
              },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 1, delay: 0.5 },
              },
            }}
            className="mt-12"
          >
            <Button
              style={{ fontSize: 18 }}
              size="large"
              type="primary"
              ghost
            >
              Xem tất cả bác sĩ 
              <ArrowRight2 size={18} />
            </Button>
          </AnimatedSection>
        </div>
      </div>
      <DividerComponent />
    </div>
  );
};

export default Doctors;
