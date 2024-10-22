import { Calendar, Col, Row, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// Đặt múi giờ mặc định cho ứng dụng của bạn
const DEFAULT_TIMEZONE = "Asia/Ho_Chi_Minh"; // Hoặc múi giờ phù hợp với ứng dụng của bạn

interface Props {
  setDate: (date: string) => void;
  doctorSchedules: any[];
}

const CustomCalendar = (props: Props) => {
  const { setDate, doctorSchedules } = props;

  const disabledDate = (current: Dayjs) => {
    const isBeforeToday = current.isBefore(dayjs().tz(DEFAULT_TIMEZONE).startOf("day"));
    const isInDoctorSchedule = doctorSchedules.some((schedule) => {
      const scheduleStart = dayjs(schedule.start).tz(DEFAULT_TIMEZONE);
      const scheduleEnd = dayjs(schedule.end).tz(DEFAULT_TIMEZONE);
      return (
        current.tz(DEFAULT_TIMEZONE).startOf("day").isSame(scheduleStart.startOf("day")) ||
        (current.tz(DEFAULT_TIMEZONE).isAfter(scheduleStart) &&
          current.tz(DEFAULT_TIMEZONE).isBefore(scheduleEnd))
      );
    });
    return isBeforeToday || !isInDoctorSchedule;
  };

  return (
    <Calendar
      fullscreen={false}
      disabledDate={disabledDate}
      headerRender={({ value, onChange }) => {
        const currentYear = dayjs().tz(DEFAULT_TIMEZONE).year();
        const currentMonth = dayjs().tz(DEFAULT_TIMEZONE).month();
        const monthOptions = [];
        const yearOptions = [];

        for (let i = 0; i < 12; i++) {
          if (currentYear === value.year() && i < currentMonth) continue;
          monthOptions.push(
            <Select.Option
              key={i}
              value={i}
            >
              {dayjs().tz(DEFAULT_TIMEZONE).month(i).format("MMMM")}
            </Select.Option>,
          );
        }

        for (let i = currentYear; i <= currentYear + 2; i++) {
          yearOptions.push(
            <Select.Option
              key={i}
              value={i}
            >
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
                    const now = value.year(newYear);
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
                    const now = value.month(newMonth);
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
