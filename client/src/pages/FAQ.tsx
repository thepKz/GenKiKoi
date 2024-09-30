// import React from "react";
// import "react-multi-carousel/lib/styles.css";
// import { AnimatedSection, DividerComponent } from "../share";

import { Collapse, CollapseProps } from "antd";
import { useEffect } from "react";

// const FAQ = () => {
//   return (
//     <div className="bg-white">
//       <div className="container mx-auto px-4 pt-40 pb-20">
//         <h1 className="text-4xl font-bold text-center mb-12">Thông tin liên hệ</h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           <ContactItem
//             icon={<ClockIcon />}
//             title="Giờ làm việc"
//             details={["Thứ 2 – Chủ nhật", "Sáng: 8h – 12h30", "Chiều: 14h – 20h"]}
//           />
//           <ContactItem
//             icon={<LocationIcon />}
//             title="Địa chỉ"
//             details={["386 CMT8, P.Phú Cường,", "TP. Thủ Dầu Một, Tỉnh Bình", "Dương"]}
//           />
//           <ContactItem
//             icon={<PhoneIcon />}
//             title="Hotline"
//             details={["0918 708 179"]}
//           />
//           <ContactItem
//             icon={<EmailIcon />}
//             title="Email"
//             details={["atpetcare.vn@gmail.com"]}
//           />
//         </div>
//       </div>

//       <div className="bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-3xl mx-auto">
//           <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Liên hệ giải đáp</h2>
//           <p className="text-center text-gray-600 mb-8">
//             Bất cứ điều gì quý khách hàng thắc mắc hoặc cần phản hồi đều có thể liên hệ tại đây với GenKiKoi
//           </p>
//           <FeedbackForm />
//         </div>
//       </div>
//     </div>
//   );
// };

// const ContactItem = ({ icon, title, details }) => (
//   <div className="flex flex-col items-start">
//     <div className="flex items-center mb-4">
//       {icon}
//       <h2 className="text-xl font-semibold">{title}</h2>
//     </div>
//     {details.map((detail, index) => (
//       <p key={index}>{detail}</p>
//     ))}
//   </div>
// );

// const FeedbackForm = () => (
//   <form className="space-y-6">
//     <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
//       <InputField label="Họ và Tên" name="name" type="text" />
//       <InputField label="Điện thoại" name="phone" type="tel" />
//       <InputField label="Email (nếu có)" name="email" type="email" />
//       <InputField label="Địa chỉ" name="address" type="text" />
//     </div>
//     <SelectField label="Danh mục góp ý" name="category" options={["—Please choose an option—"]} />
//     <TextareaField label="Nội dung" name="message" rows={4} />
//     <SubmitButton text="GỬI" />
//   </form>
// );

// const InputField = ({ label, name, type, placeholder }) => (
//   <div>
//     <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
//     <input type={type} name={name} id={name} placeholder={placeholder} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-primary focus:border-blue-primary" />
//   </div>
// );

// const SelectField = ({ label, name, options }) => (
//   <div>
//     <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
//     <select id={name} name={name} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-primary focus:border-blue-primary rounded-md">
//       {options.map((option, index) => (
//         <option key={index}>{option}</option>
//       ))}
//     </select>
//   </div>
// );

// const TextareaField = ({ label, name, rows }) => (
//   <div>
//     <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
//     <textarea id={name} name={name} rows={rows} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-primary focus:border-blue-primary"></textarea>
//   </div>
// );

// const SubmitButton = ({ text }) => (
//   <div>
//     <button type="submit" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-primary">
//       {text}
//     </button>
//   </div>
// );

// const ClockIcon = () => (
//   <svg className="w-6 h-6 text-blue-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//   </svg>
// );

// const LocationIcon = () => (
//   <svg className="w-6 h-6 text-blue-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
//   </svg>
// );

// const PhoneIcon = () => (
//   <svg className="w-6 h-6 text-blue-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
//   </svg>
// );

// const EmailIcon = () => (
//   <svg className="w-6 h-6 text-blue-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//   </svg>
// );

// export default FAQ;

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Trung tâm của bạn có cung cấp dịch vụ gì cho cá Koi?",
    children: (
      <div className="">
        Chúng tôi cung cấp các dịch vụ chăm sóc thú y chuyên nghiệp cho cá Koi bao gồm:
        <ul className="ml-10 list-disc">
          <li>Tư vấn trực tuyến với bác sĩ thú y.</li>
          <li>Đánh giá chất lượng nước và môi trường sống cho cá.</li>
          <li>Điều trị bệnh tại nhà hoặc tại trung tâm.</li>
          <li>Kiểm định chất lượng hồ cá và đề xuất cải thiện môi trường sống.</li>
        </ul>
      </div>
    ),
  },
  {
    key: "2",
    label: "Giờ hoạt động của trung tâm là khi nào?",
    children: (
      <p>
        Trung tâm chúng tôi hoạt động từ 8:00 AM đến 6:00 PM, từ Thứ Hai đến Thứ Bảy. Tuy nhiên, đối
        với các trường hợp khẩn cấp hoặc yêu cầu đặc biệt, bạn có thể liên hệ trước để đặt lịch
        ngoài giờ.
      </p>
    ),
  },
  {
    key: "3",
    label: "Trung tâm có chính sách bảo hành cho dịch vụ không?",
    children: (
      <p>
        Chúng tôi có chính sách hỗ trợ sau dịch vụ trong vòng 7 ngày kể từ ngày hoàn thành điều trị
        hoặc kiểm định. Nếu bạn gặp bất kỳ vấn đề gì sau khi sử dụng dịch vụ, hãy liên hệ ngay để
        được hỗ trợ kịp thời.
      </p>
    ),
  },
];

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="section bg-green-dark py-36 pt-44 text-white">
        <div className="mx-auto w-[45%]">
          <h1 className="heading-2 text-center">Những câu hỏi thường gặp</h1>
          <div className="mt-10">
            <Collapse
              items={items}
              defaultActiveKey={["1"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
