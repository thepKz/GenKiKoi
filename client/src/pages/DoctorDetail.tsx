import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Avatar, Button, Card, ConfigProvider, Divider } from 'antd'
import { ArrowRight2 } from 'iconsax-react'
import { AnimatedSection, DividerComponent } from "../share";
import Doctor1 from "../assets/doctor1.webp";

const DoctorDetail = () => {
//   const { id } = useParams();
//   const [doctor, setDoctor] = useState(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     // Fetch doctor details using the id
//     // This is just a placeholder, replace with your actual API call
//     const fetchDoctorDetails = async () => {
//       try {
//         const response = await fetch(`/api/doctors/${id}`);
//         const data = await response.json();
//         setDoctor(data);
//       } catch (error) {
//         console.error('Error fetching doctor details:', error);
//       }
//     };
//     fetchDoctorDetails();
//   }, [id]);

//   if (!doctor) return <div>Loading...</div>;

  return (
    <div className="bg-green-dark text-white">
    <div className="container mx-auto px-4 lg:px-20 ">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column */}
        <div className="lg:w-1/3">
          <div className="sticky pt-32">
            <AnimatedSection
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.5, delay: 0.5 } },
              }}
            >
              <Avatar size={200} src={Doctor1} className="mb-4" />
              <h1 className="heading-3 mb-2">Bác sĩ Nguyễn Văn A</h1>
              <h2 className="text-xl mb-4 font-bold">Chuyên gia cá Koi</h2>
              <p className="text-lg mb-4">Với hơn 10 năm kinh nghiệm trong lĩnh vực chăm sóc và điều trị bệnh cho cá Koi, Bác sĩ Nguyễn Văn A là một trong những chuyên gia hàng đầu tại Việt Nam về lĩnh vực này.</p>
              <Button type="primary" size="large" className="mt-4" ghost>
                Đặt lịch hẹn
                <ArrowRight2 size={18} className="ml-2" />
              </Button>
            </AnimatedSection>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:w-2/3 pt-32 pb-28">
          {/* Specialties section */}
          <AnimatedSection
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 1.5, delay: 0.5 } },
            }}
          >
            <h2 className="heading-2 mb-6">Chuyên môn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-blue-primary text-white">
                <h3 className="text-xl font-bold mb-2">Điều trị bệnh cá Koi</h3>
                <p>Chuyên sâu về chẩn đoán và điều trị các bệnh phổ biến ở cá Koi.</p>
              </Card>
                <Card className="bg-blue-primary text-white">
                <h3 className="text-xl font-bold mb-2">Quản lý chất lượng nước</h3>
                <p>Kiểm soát và duy trì chất lượng nước tối ưu cho cá Koi.</p>
              </Card>
              <Card className="bg-blue-primary text-white">
                <h3 className="text-xl font-bold mb-2">Tư vấn dinh dưỡng</h3>
                <p>Xây dựng chế độ dinh dưỡng phù hợp cho từng loại cá Koi.</p>
              </Card>
              <Card className="bg-blue-primary text-white">
                <h3 className="text-xl font-bold mb-2">Phẫu thuật cá Koi</h3>
                <p>Thực hiện các ca phẫu thuật phức tạp cho cá Koi.</p>
              </Card>
            </div>
          </AnimatedSection>


          {/* Education section */}
          <div className="mt-16">
          <AnimatedSection
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 1.5, delay: 0.5 } },
            }}
          >
            <h2 className="heading-2 mb-6">Quá trình đào tạo</h2>
            <ConfigProvider
              theme={{
                components: {
                  Divider: {
                    marginLG: 20,
                  },
                },
              }}
            >
              <div className="text-lg">
                <p><strong>2010-2014:</strong> Đại học Nông Lâm TP.HCM - Bác sĩ Thú y</p>
                <br/> 
                <p><strong>2014-2016:</strong> Thạc sĩ Bệnh lý học Thủy sản - Đại học Cần Thơ</p>
                <br/>
                <p><strong>2016-2018:</strong> Chứng chỉ chuyên sâu về Bệnh học Cá Koi - Nhật Bản</p>
                <br/>
                <p><strong>2018-2020:</strong> Tiến sĩ Thú y - Đại học Nông Lâm TP.HCM</p>
              </div>
            </ConfigProvider>
          </AnimatedSection>
          </div>

          {/* Work experience section */}
          <div className="mt-16">
          <AnimatedSection
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 1.5, delay: 0.5 } },
            }}
          >
            <h2 className="heading-2 mb-6">Kinh nghiệm làm việc</h2>
            <ConfigProvider
              theme={{
                components: {
                  Divider: {
                    marginLG: 20,
                  },
                },
              }}
            >
              <div className="text-lg">
                <p><strong>2020-Hiện tại:</strong> Chuyên gia tư vấn cao cấp - Trung tâm Nghiên cứu và Phát triển Cá Koi Việt Nam</p>
                <br/>
                <p><strong>2018-2020:</strong> Bác sĩ thú y chuyên khoa - Bệnh viện Thủy sản TP.HCM</p>
                <br/>
                <p><strong>2016-2018:</strong> Nghiên cứu viên - Viện Nghiên cứu Nuôi trồng Thủy sản III</p>
              </div>
            </ConfigProvider>
          </AnimatedSection>
          </div>

          {/* Memberships section */}
          <div className="mt-16">
          <AnimatedSection
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 1.5, delay: 0.5 } },
            }}
          >
            <h2 className="heading-2 mb-6">Thành viên của tổ chức</h2>
            <ul className="list-disc list-inside text-lg">
              <li>Hội Thú y Thủy sản Việt Nam</li>
              <br/>
              <li>Hiệp hội Cá Koi Quốc tế (International Koi Association)</li>
              <br/>
              <li>Câu lạc bộ Người nuôi cá Koi Việt Nam</li>
              <br/>
              <li>Hội đồng Khoa học và Công nghệ ngành Thủy sản</li>
            </ul>
          </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default DoctorDetail
