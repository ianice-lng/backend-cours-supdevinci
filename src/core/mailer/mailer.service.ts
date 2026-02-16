import { Injectable } from "@nestjs/common";
import { MailerPort } from "./mailer.port";
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService implements MailerPort {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    });
  }

  async send(to: string, subject: string, content: string): Promise<void> {
    await this.transporter.sendMail({
      from: '"Your App" <noreply@yourapp.com>',
      to,
      subject,
      text: content
    });
  }
}