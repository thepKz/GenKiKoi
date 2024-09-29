import React from "react";
import "react-multi-carousel/lib/styles.css";
import { AnimatedSection, DividerComponent } from "../share";

const FAQ = () => {
  return (
    <div className="bg-green-dark text-white ">
      <div className="container mx-auto px-4 pt-40 ">
  <h1 className="text-4xl font-bold text-center mb-20">Thông tin liên hệ</h1>
  
  <div className="grid grid-cols-4 text-center">
    <div>
      <h1 className="font-bold text-center mb-5"> Giờ làm việc </h1>
      <p>Thứ 2 - Chủ nhật</p>
      <p>Sáng: 8h – 12h30</p>
      <p>Chiều: 14h – 20h</p>
    </div>
    <div>
      <h1 className="font-bold text-center mb-5"> Địa chỉ </h1>
      <p>266 Chu Văn An, P. 26, Q. Bình Thạnh, TP. Hồ Chí Minh</p>
    </div>
    <div>
      <h1 className="font-bold text-center mb-5"> Hotline </h1>
      <p>0918 708 179</p>
      
    </div>
    <div>
      <h1 className="font-bold text-center mb-5"> Email </h1>
      <p>genkikoi.vn@gmail.com</p>
      
    </div>
    
    
  </div>
</div>
      <div >
        <svg
  viewBox="0 0 1000 100"
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="none"
>
  <path
    opacity="0.15"
    fill="#006478"
    d="M0 86C0 86 88.64 82.52 300 50C560 10 814 23 1003 60L1015 32L1018 -4H0V86Z"
  ></path>
  <path
    opacity="0.3"
    fill="#006478"
    d="M0 55C0 55 271 9.87 500 23C657 32 830 70 1015 86V0H0V55Z"
  ></path>
  <path
    fill="#006478"
    d="M0 42C0 42 188.29 10 508 10C798 10 1002 45 1002 45V0H0V42Z"
  ></path>
</svg>
      <div className="bg-blue-primary py-12 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Liên hệ giải đáp</h2>
          <p className="text-center mb-8">
            Bất cứ điều gì quý khách hàng thắc mắc hoặc cần phản hồi đều có thể liên hệ tại đây với GenKiKoi
          </p>
          <FeedbackForm />
        </div>
      </div>
      </div>
    </div>
  );
};


const FeedbackForm = () => (
  <form className="space-y-6">
    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
      <InputField label="Họ và Tên" name="name" type="text" />
      <InputField label="Điện thoại" name="phone" type="tel" />
      <InputField label="Email (nếu có)" name="email" type="email" />
      <InputField label="Địa chỉ" name="address" type="text" />
    </div>
    <SelectField label="Danh mục góp ý" name="category" options={["—Please choose an option—"]} />
    <TextareaField label="Nội dung" name="message" rows={4} />
    <SubmitButton text="GỬI" />
  </form>
);

const InputField = ({ label, name, type, placeholder }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-white">{label}</label>
    <input type={type} name={name} id={name} placeholder={placeholder} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-primary focus:border-blue-primary" />
  </div>
);

const SelectField = ({ label, name, options }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-white">{label}</label>
    <select id={name} name={name} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-dark focus:border-blue-primary rounded-md">
      {options.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  </div>
);

const TextareaField = ({ label, name, rows }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-white">{label}</label>
    <textarea id={name} name={name} rows={rows} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-primary focus:border-blue-primary"></textarea>
  </div>
);

const SubmitButton = ({ text }) => (
  <div>
    <button type="submit" className="w-28  inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 ">
      {text}
    </button>
  </div>
);

export default FAQ;