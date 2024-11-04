import cron from "node-cron";
import { Appointment, Payment } from "../models";

export const startScheduledTasks = () => {
  // Chạy vào 00:01 mỗi ngày
  cron.schedule(
    "1 0 * * *",
    async () => {
      try {
        console.log("Bắt đầu cập nhật cuộc hẹn quá hạn...");

        const currentDate = new Date();

        const expiredAppointments = await Appointment.find({
          appointmentDate: { $lt: currentDate },
          status: { $nin: ["Đã hoàn thành", "Đã hủy"] },
        });

        let updatedCount = 0;

        for (const appointment of expiredAppointments) {
          try {
            appointment.status = "Đã hủy";
            appointment.notes = "Cuộc hẹn đã bị hủy do quá hạn!";

            await Payment.findOneAndUpdate(
              { appointmentId: appointment._id, status: { $ne: "PAID" } },
              { status: "CANCELLED" }
            );
            await appointment.save();
            updatedCount++;
          } catch (error) {
            console.error(
              `Lỗi khi cập nhật cuộc hẹn ${appointment._id}:`,
              error
            );
          }
        }
        console.log(`Đã cập nhật ${updatedCount} cuộc hẹn quá hạn`);
      } catch (error) {
        console.error("Lỗi khi chạy scheduled task cập nhật cuộc hẹn:", error);
      }
    },
    {
      scheduled: true,
      timezone: "Asia/Ho_Chi_Minh", // Đặt múi giờ Việt Nam
    }
  );
};
