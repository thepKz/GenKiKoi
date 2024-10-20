import { Calendar, Col, Row, Select } from "antd";
import moment from "moment";

interface Props {
  setDate: (date: string) => void;
}

const CustomCalendar = (props: Props) => {
  const { setDate } = props;
  return (
    <Calendar
      style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
      fullscreen={false}
      disabledDate={(current) => current && current < moment().startOf("day")}
      headerRender={({ value, onChange }) => {
        const currentYear = moment().year();
        const currentMonth = moment().month();
        const monthOptions = [];
        const yearOptions = [];

        for (let i = 0; i < 12; i++) {
          if (currentYear === value.year() && i < currentMonth) continue; // Ẩn tháng trong năm hiện tại
          monthOptions.push(
            <Select.Option key={i} value={i}>
              {moment().month(i).format("MMMM")}
            </Select.Option>,
          );
        }

        for (let i = currentYear; i <= currentYear + 2; i++) {
          yearOptions.push(
            <Select.Option key={i} value={i}>
              {i}
            </Select.Option>,
          );
        }

        return (
          <div style={{ padding: 8 }}>
            <Row gutter={8}>
              <Col>
                <Select
                  size="small"
                  value={value.year()}
                  onChange={(newYear) => {
                    const now = value.clone().year(newYear);
                    onChange(now);
                  }}
                >
                  {yearOptions}
                </Select>
              </Col>
              <Col>
                <Select
                  size="small"
                  value={value.month()}
                  onChange={(newMonth) => {
                    const now = value.clone().month(newMonth);
                    onChange(now);
                  }}
                >
                  {monthOptions}
                </Select>
              </Col>
            </Row>
          </div>
        );
      }}
      onChange={(e) => setDate(e.format("YYYY-MM-DD"))}
    />
  );
};

export default CustomCalendar;
