import { Calendar, Col, Row, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// Đặt múi giờ mặc định cho ứng dụng của bạn
const DEFAULT_TIMEZONE = "Asia/Ho_Chi_Minh"; // Hoặc múi giờ phù hợp với ứng dụng của bạn

interface Props {
  setDate: (date: Dayjs) => void;
  doctorSchedule: {
    weekSchedule: Array<{
      dayOfWeek: string;
      slots: Array<{
        slotTime: string;
        isBooked: boolean;
      }>;
    }>;
  } | null;
}

const CustomCalendar = (props: Props) => {
  const { setDate, doctorSchedule } = props;

  console.log(doctorSchedule);

  const disabledDate = (current: Dayjs) => {
    const isBeforeToday = current.isBefore(
      dayjs().tz(DEFAULT_TIMEZONE).endOf("day"),
    );

    if (!doctorSchedule) return true;

    const isInDoctorSchedule = doctorSchedule.weekSchedule.some((day) => {
      return (
        day.dayOfWeek === current.format("DD/MM/YYYY") &&
        day.slots.some((slot) => !slot.isBooked)
      );
    });

    return isBeforeToday || !isInDoctorSchedule;
  };

  return (
    <Calendar
      style={{ border: "1px solid #ccc" }}
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
            <Select.Option key={i} value={i}>
              {dayjs().tz(DEFAULT_TIMEZONE).month(i).format("MMMM")}
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
      onChange={(date) => setDate(date)}
    />
  );
};

export default CustomCalendar;
