import nodemailer from "nodemailer";
import { emailer } from "../config";

// * https://nodemailer.com/about/
export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: emailer.GMAIL_USER,
      pass: emailer.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `Portfolio Instruments <${emailer.GMAIL_USER}>`,
    to: to,
    subject: subject,
    html: `<!DOCTYPE html>
    <html>
    <body>${html}</body>
    </html>`,
  });
}
