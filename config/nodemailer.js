import nodemailer from "nodemailer";
import keys from "./keys.js";

const { emailService } = keys;

const transporter = nodemailer.createTransport({
  host: emailService.host,
  port: emailService.port,
  secure: false,
  auth: {
    user: emailService.senderEmail,
    pass: emailService.senderPass,
  },
});

export default transporter;
