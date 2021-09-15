import nodemailer from "nodemailer";
import { emailer } from "../config";
import logger from "../logger";
import { formatLogError } from "../logger/formatLogError";

export type TransportOptions = {
  from: string;
  to: string;
  subject: string;
  html: string;
  attachments?: Attachment[];
};

export type Attachment = {
  filename: string;
  path: string;
};

// * https://nodemailer.com/about/
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  filename?: string,
  path?: string
): Promise<void> {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: emailer.GMAIL_USER,
        pass: emailer.GMAIL_PASS,
      },
    });

    const transportOptions: TransportOptions = {
      from: `Portfolio Instruments <${emailer.GMAIL_USER}>`,
      to: to,
      subject: subject,
      html: `<html>
      <body>${html}</body>
      </html>`,
    };

    if (filename && path) {
      transportOptions.attachments = [{ filename, path }];
    }

    await transporter.sendMail(transportOptions);
  } catch (err) {
    logger.error(formatLogError(err, "sendEmailUtil"));
  }
}
