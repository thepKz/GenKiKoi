import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'maitanthepmrthep@gmail.com',
    pass: 'fpjr xbrv utgj enok'  // App password you generated
  }
});

export const sendVerificationEmail = async (to: string, otp: string) => {
  const mailOptions = {
    from: 'maitanthepmrthep@gmail.com',
    to: to,
    subject: 'Email Verification',
    html: `
      <h1>Verify Your Email</h1>
      <p>Your verification code is:</p>
      <h2>${otp}</h2>
      <p>Please enter this code in the application to verify your email address.</p>
      <p>This code will expire in 10 minutes.</p>
    `  
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};