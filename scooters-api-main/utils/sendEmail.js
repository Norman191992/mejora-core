import sendgrid from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = ({ to, from, subject, text, html }) => {
  console.log(process.env.SENDGRID_API_KEY);
  const msg = { to, from, subject, text, html };
  return sendgrid.send(msg);
};

export default sendEmail;
