import { mailtrapClient, sender } from "./mailtrap.config";

export const sendVerificationEmail = async (
  email: string,
  username: string,
  verificationToken: string
) => {
  const recipient = [{ email }];
  try {
    await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "2949147d-573c-499b-95b2-ecb8e22d018f",
      template_variables: {
        company_info_name: "GenKiKoi",
        name: username,
        zip_code: verificationToken,
        company_info_country: "Việt Nam",
      },
    });
  } catch (error) {
    throw new Error(`Error sending verification email: ${error}`);
  }
};
