import cron from "node-cron";
import { Appointment, DoctorSchedule, Payment } from "../models";

export const updateExpiredPayments = () => {
  cron.schedule(
    "* * * * *",
    async () => {
      try {
        const expiredPayments = await Payment.find({
          status: "PENDING",
          date: {
            $lt: new Date(Date.now() - 15 * 60 * 1000),
          },
        });

        for (const payment of expiredPayments) {
          payment.status = "CANCELLED";
          await payment.save();
          const appointment = await Appointment.findById(payment.appointmentId);

          if (appointment) {
            appointment.status = "Đã hủy";
            appointment.notes =
              "Cuộc hẹn bị hủy cho chưa thanh toán sau 15 phút!";

            await appointment.save();

            const doctorSchedule = await DoctorSchedule.findOne({
              "weekSchedule.slots.appointmentIds": appointment._id.toString(),
            });

            if (doctorSchedule) {
              for (let day of doctorSchedule.weekSchedule) {
                for (let slot of day.slots) {
                  const appointmentIndex = slot.appointmentIds?.indexOf(
                    appointment._id.toString()
                  );
                  if (
                    appointmentIndex !== -1 &&
                    appointmentIndex !== undefined &&
                    slot.appointmentIds
                  ) {
                    slot.appointmentIds.splice(appointmentIndex, 1);
                    slot.currentCount = Math.max(0, slot.currentCount - 1);
                    slot.isBooked = slot.currentCount >= 3;
                    break;
                  }
                }
              }

              await DoctorSchedule.findOneAndUpdate(
                { _id: doctorSchedule._id },
                {
                  $set: {
                    weekSchedule: doctorSchedule.weekSchedule,
                  },
                },
                { new: true }
              );
            }
          }
        }

        if (expiredPayments.length > 0) {
          console.log(
            `Đã cập nhật ${expiredPayments.length} payment hết hạn thành CANCELLED`
          );
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật payment hết hạn:", error);
      }
    },
    {
      scheduled: true,
      timezone: "Asia/Ho_Chi_Minh", // Đặt múi giờ Việt Nam
    }
  );
};
