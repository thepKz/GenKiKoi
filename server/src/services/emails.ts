import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

// Create a transporter object
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Thay đổi host thành Gmail SMTP
  port: 465, // Sử dụng cổng 465 cho SSL
  secure: true, // Bật SSL
  auth: {
    user: "dodung.dqd@gmail.com",
    // user: "maitanthepmrthep@gmail.com",
    pass: process.env.MAIL_PASSWORD, // Thay bằng mật khẩu ứng dụng của Gmail
  },
});

export const sendVerificationEmail = async (
  email: string,
  username: string,
  verificationToken: string
) => {
  const mailOptions = {
    from: "GenKiKoi",
    to: email,
    subject: "Xác thực Email của bạn - GenKiKoi",
    html: `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Xác thực Email</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
        .header { background-color: #0C3C54; color: white; padding: 10px; text-align: center; }
        .content { background-color: white; padding: 20px; border-radius: 5px; }
        .otp { font-size: 24px; font-weight: bold; text-align: center; color: #0C3C54; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>GenKiKoi</h1>
        </div>
        <div class="content">
          <h2>Xác thực Email của bạn</h2>
          <p>Xin chào,${username}</p>
          <p>Cảm ơn bạn đã đăng ký tài khoản tại GenKiKoi. Để hoàn tất quá trình đăng ký, vui lòng sử dụng mã xác thực dưới đây:</p>
          <div class="otp">${verificationToken}</div>
          <p>Mã xác thực này sẽ hết hạn sau 10 phút.</p>
          <p>Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.</p>
          <p>Trân trọng,<br>Đội ngũ GenKiKoi</p>
        </div>
        <div class="footer">
          <p>© 2023 GenKiKoi. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </body>
    </html>
  `,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

export const sendResetPasswordEmail = async (
  email: string,
  username: string,
  resetToken: string
) => {
  const mailOptions = {
    from: "GenKiKoi",
    to: email,
    subject: "Khôi phục mật khẩu - GenKiKoi",
    html: `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Khôi phục mật khẩu</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
        .header { background-color: #0C3C54; color: white; padding: 10px; text-align: center; }
        .content { background-color: white; padding: 20px; border-radius: 5px; }
        .otp { font-size: 24px; font-weight: bold; text-align: center; color: #0C3C54; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>GenKiKoi</h1>
        </div>
        <div class="content">
          <h2>Khôi phục mật khẩu</h2>
          <p>Xin chào ${username},</p>
          <p>Chúng tôi nhận được yêu cầu khôi phục mật khẩu cho tài khoản của bạn. Vui lòng sử dụng mã dưới đây để đặt lại mật khẩu:</p>
          <div class="otp">${resetToken}</div>
          <p>Mã này sẽ hết hạn sau 10 phút.</p>
          <p>Nếu bạn không yêu cầu khôi phục mật khẩu, vui lòng bỏ qua email này.</p>
          <p>Trân trọng,<br>Đội ngũ GenKiKoi</p>
        </div>
        <div class="footer">
          <p>© 2023 GenKiKoi. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </body>
    </html>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Reset password email sent successfully");
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw error;
  }
};

export const sendAppointmentConfirmationEmail = async (
  appointmentDate: Date,
  doctorName: string,
  slotTime: string,
  serviceName: string,
  customerName: string,
  typeOfConsulting: string,
  email: string
) => {
  const mailOptions = {
    from: "GenKiKoi",
    to: email,
    subject: "Xác thực Email của bạn - GenKiKoi",
    html: `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thông báo đặt lịch thành công</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
        .header { background-color: #0C3C54; color: white; padding: 10px; text-align: center; }
        .content { background-color: white; padding: 20px; border-radius: 5px; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>GenKiKoi</h1>
        </div>
        <div class="content">
          <h2>Thông báo đặt lịch thành công</h2>
          <p>Xin chào, ${customerName}</p>
          <p>Cảm ơn bạn đã đặt dịch vụ của trung tâm chúng tôi. Dưới đây là thông tin về cuộc hẹn của bạn!</p>
          <p><strong>Bác sĩ:</strong> ${doctorName}</p>
          <p><strong>Ngày:</strong> ${appointmentDate.toLocaleDateString()}</p>
          <p><strong>Giờ:</strong> ${slotTime}</p>
          <p><strong>Dịch vụ:</strong> ${serviceName}</p>
          <p><strong>Hình thức khám:</strong> ${typeOfConsulting}</p>
          <p>Trân trọng,<br>Đội ngũ GenKiKoi</p>
        </div>
        <div class="footer">
          <p>© 2023 GenKiKoi. Tất cả các quyền được bảo lưu.</p>          
          <p>Hotline hỗ trợ: 0352195876</p>
        </div>
      </div>
    </body>
    </html>
  `,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

export const sendOnlineAppointmentEmail = async (
  appointmentDate: Date,
  doctorName: string,
  slotTime: string,
  serviceName: string,
  customerName: string,
  typeOfConsulting: string,
  email: string,
  googleMeetLink: string
) => {
  const mailOptions = {
    from: "GenKiKoi",
    to: email,
    subject: "Xác thực Email của bạn - GenKiKoi",
    html: `
<!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thông báo đặt lịch thành công</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
        .header { background-color: #0C3C54; color: white; padding: 10px; text-align: center; }
        .content { background-color: white; padding: 20px; border-radius: 5px; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>GenKiKoi</h1>
        </div>
        <div class="content">
          <h2>Thông báo đặt lịch thành công</h2>
          <p>Xin chào, ${customerName}</p>
          <p>Cảm ơn bạn đã đặt dịch vụ của trung tâm chúng tôi. Dưới đây là thông tin về cuộc hẹn của bạn!</p>
          <p><strong>Bác sĩ:</strong> ${doctorName}</p>
          <p><strong>Ngày:</strong> ${appointmentDate.toLocaleDateString()}</p>
          <p><strong>Giờ:</strong> ${slotTime}</p>
          <p><strong>Dịch vụ:</strong> ${serviceName}</p>
          <p><strong>Hình thức khám:</strong> ${typeOfConsulting}</p>
          <p><strong>Link Google Meet:</strong> <a href="${googleMeetLink}">${googleMeetLink}</a></p>
          <p>Trân trọng,<br>Đội ngũ GenKiKoi</p>
        </div>
        <div class="footer">
          <p>© 2023 GenKiKoi. Tất cả các quyền được bảo lưu.</p>          
          <p>Hotline hỗ trợ: 0352195876</p>
        </div>
      </div>
    </body>
    </html>
  `,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

export const sendPasswordChangeAlert = async (
  email: string,
  username: string
) => {
  const mailOptions = {
    from: "GenKiKoi",
    to: email,
    subject: "Cảnh báo bảo mật - Mật khẩu đã được thay đổi",
    html: `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thông báo thay đổi mật khẩu</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
        .header { background-color: #0C3C54; color: white; padding: 10px; text-align: center; }
        .content { background-color: white; padding: 20px; border-radius: 5px; }
        .warning { color: #721c24; background-color: #f8d7da; padding: 10px; border-radius: 5px; margin: 10px 0; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>GenKiKoi</h1>
        </div>
        <div class="content">
          <h2>Thông báo thay đổi mật khẩu</h2>
          <p>Xin chào ${username},</p>
          <p>Chúng tôi phát hiện mật khẩu tài khoản của bạn vừa được thay đổi thành công.</p>
          <div class="warning">
            <p>Nếu bạn không thực hiện thay đổi này, vui lòng:</p>
            <ol>
              <li>Thay đổi mật khẩu ngay lập tức</li>
              <li>Liên hệ với bộ phận hỗ trợ của chúng tôi</li>
            </ol>
          </div>
          <p>Trân trọng,<br>Đội ngũ GenKiKoi</p>
        </div>
        <div class="footer">
          <p>© 2023 GenKiKoi. Tất cả các quyền được bảo lưu.</p>
          <p>Hotline hỗ trợ: 0352195876</p>
        </div>
      </div>
    </body>
    </html>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password change alert email sent successfully");
  } catch (error) {
    console.error("Error sending password change alert email:", error);
    throw error;
  }
};
