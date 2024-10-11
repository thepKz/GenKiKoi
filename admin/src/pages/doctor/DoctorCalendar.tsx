import { Calendar } from "antd";

const DoctorCalendar = () => {
  return (
    <div>
      <div className="container mx-auto my-5 h-[calc(100vh-115px)] rounded-md bg-white p-5 shadow-sm lg:w-[95%]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="heading-3">Lịch làm việc</h1>
        </div>
        <div className="">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default DoctorCalendar;
