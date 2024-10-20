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
    pass: process.env.MAIL_PASSWORD, // Thay bằng mật khẩu ứng dụng của Gmail
  },
});

export const sendVerificationEmail = async (
  email: string,
  username: string,
  verificationToken: string
) => {
  const mailOptions = {
    from: "GenKiKoi <dodung.dqd@gmail.com>",
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
