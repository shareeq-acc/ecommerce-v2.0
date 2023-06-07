import transporter from "../config/nodemailer.js";
import keys from "../config/keys.js";

const sendEmail = async ({ email, subject, html }) => {
  await transporter.sendMail({
    from: keys.emailService.senderEmail,
    to: email,
    subject: subject,
    html,
  });
};

export default sendEmail;
