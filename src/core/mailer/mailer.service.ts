import { Injectable } from "@nestjs/common";
import { MailerPort } from "./mailer.port";
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailerService implements MailerPort {
    async publish(content: string, recipient: string): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: process.env.mail_host,
            port: 587,
            secure: false,
            auth: {
                user: process.env.mail,
                pass: process.env.mail_password
            }
        });
    
        await transporter.sendMail({
            from: '"Your App"',
            to: recipient,
            subject: 'Welcome to our app!',
            text: content
        });
    }
}