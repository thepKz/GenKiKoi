import { Avatar, Breadcrumb, Col, Divider, Row } from "antd";
import { HeaderPage } from "../../components";
import { Link } from "react-router-dom";
import { Stickynote } from "iconsax-react";
import { GiCirclingFish } from "react-icons/gi";

const InspectionRecord = () => {
  return (
    <div className="section">
      <HeaderPage heading="Chi tiết hồ sơ" />
      <Breadcrumb
        separator=">"
        items={[
          {
            title: (
              <Link to="/doctor/customers">
                <div className="flex items-center gap-2">
                  <Stickynote size={20} />
                  Hồ sơ khách hàng
                </div>
              </Link>
            ),
          },
          {
            title: "Hồ sơ bệnh án",
          },
          {
            title: <Link to={"/doctor/customers/fishes"}>Danh sách cá</Link>,
          },
          {
            title: "67069dv2b5759828c4f9e611",
          },
          {
            title: "67sn43j",
          },
        ]}
      />
      <Row gutter={32} className="">
        <Col span={7}>
          <div className="text-base">
            <h4 className="heading-4">Thông tin chung</h4>
            <Divider />
            <div className="mt-2 flex flex-col gap-1">
              <p>
                <span className="font-semibold">Tên khách: </span>Đỗ Quang Dũng
              </p>
              <p>
                <span className="font-semibold">Tình trạng hồ cá: </span>Rất tệ
              </p>
              <p>
                <span className="font-semibold">Ngày kiểm định: </span>
                10/10/2024
              </p>
              <p>
                <span className="font-semibold">Bác sĩ: </span>Mai Tấn Thép
              </p>
              <div className="">
                <p className="font-semibold">Hình ảnh:</p>
                <div className="mt-3 grid grid-cols-2 gap-5">
                  <Avatar
                    shape="square"
                    style={{
                      backgroundColor: "transparent",
                      border: "2px dashed #ccc",
                      margin: "0px auto",
                    }}
                    icon={<GiCirclingFish color="#ccc" />}
                    size={155}
                  />
                  <Avatar
                    shape="square"
                    style={{
                      backgroundColor: "transparent",
                      border: "2px dashed #ccc",
                      margin: "0px auto",
                    }}
                    icon={<GiCirclingFish color="#ccc" />}
                    size={155}
                  />
                  <Avatar
                    shape="square"
                    style={{
                      backgroundColor: "transparent",
                      border: "2px dashed #ccc",
                      margin: "0px auto",
                    }}
                    icon={<GiCirclingFish color="#ccc" />}
                    size={155}
                  />
                  <Avatar
                    shape="square"
                    style={{
                      backgroundColor: "transparent",
                      border: "2px dashed #ccc",
                      margin: "0px auto",
                    }}
                    icon={<GiCirclingFish color="#ccc" />}
                    size={155}
                  />
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="text-base">
            <h4 className="heading-4">Tổng quan</h4>
            <Divider />
            <div className="flex flex-col gap-1">
              <p>
                <span className="font-semibold">Độ pH: </span>
                7.0
              </p>
              <p>
                <span className="font-semibold">Nồng độ amonia: </span>
                23%
              </p>
              <p>
                <span className="font-semibold">Nồng độ nitrat: </span>
                30%
              </p>
              <p>
                <span className="font-semibold">Hàm lượng oxy: </span>
                70%
              </p>
              <p>
                <span className="font-semibold">Mức độ sạch sẽ: </span>
                Tệ
              </p>
              <p>
                <span className="font-semibold">Tình trạng hệ thống lọc: </span>
                Bình thường
              </p>
              <p>
                <span className="font-semibold">Kích thước hồ cá: </span>
                Lớn
              </p>
              <p>
                <span className="font-semibold">Nhiệt độ nước: </span>
                26℃
              </p>
              <Divider />
              <p>
                <span className="font-semibold">Ghi chú:</span>
                <br />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Delectus voluptatum illo voluptates minima fugit ad magni?
                Quisquam beatae ipsam maxime corrupti! Deserunt itaque porro
                aliquam odit perspiciatis dolorem est, rerum rem quos distinctio
                quia a blanditiis corporis natus aliquid quod omnis! Tenetur,
                debitis dolorem.
              </p>
            </div>
          </div>
        </Col>
        <Col span={9}>
          <div className="text-base">
            <h4 className="heading-4">Chẩn đoán và điều trị</h4>
            <Divider />
            <div className="mt-2 flex flex-col gap-1">
              <p>
                <span className="font-semibold">Chẩn đoán: </span>Nồng độ Nitrat
                quá cao
              </p>
              <p>
                <span className="font-semibold">Phác đồ điều trị:</span>
                <br />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Delectus voluptatum illo voluptates minima fugit ad magni?
                Quisquam beatae ipsam maxime corrupti! Deserunt itaque porro
                aliquam odit perspiciatis dolorem est, rerum rem quos distinctio
                quia a blanditiis corporis natus aliquid quod omnis! Tenetur,
                debitis dolorem.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InspectionRecord;
