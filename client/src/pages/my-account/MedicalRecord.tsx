import { Button, ConfigProvider } from "antd";
import { Sort } from "iconsax-react";

const MedicalRecord = () => {
  return (
    <div>
      <div className="container mx-auto my-5 h-[calc(100vh-115px)] rounded-md bg-white p-5 shadow-sm lg:w-[95%]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="heading-3">Hồ sơ</h1>
          <div className="">
            <ConfigProvider
              theme={{
                inherit: false,
                token: {
                  fontFamily: "Pro-Rounded",
                },
              }}
            >
              <Button icon={<Sort size={18} />}>Lọc</Button>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecord;
