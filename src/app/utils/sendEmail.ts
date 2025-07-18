import nodemailer from 'nodemailer';
import { envMode, mailEmail, mailPassword } from '../configs';

const sendEmail = async (mailBody: {
  to: string;
  subject: string;
  message?: string;
  html: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: envMode === 'production', // true for 465, false for other ports
    auth: {
      user: mailEmail,
      pass: mailPassword,
    },
  });
  await transporter.sendMail({
    from: `"PH UNIVERSITY" <${mailEmail}>`,
    ...mailBody,
  });
};

export default sendEmail;
