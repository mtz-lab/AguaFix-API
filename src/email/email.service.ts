import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { envs } from '../config/envs';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: envs.mailHost,
      port: envs.mailPort,
      secure: envs.mailSecure, // true para el puerto 465, false para otros
      auth: {
        user: envs.mailUser,
        pass: envs.mailPassword,
      },
    });
  }

  async sendEmail(to: string, subject: string, template: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: envs.mailFrom,
        to,
        subject,
        html: template,
      });
    } catch (error) {
      this.logger.error(`No se pudo enviar el correo a ${to}`, error);
      throw error;
    }
  }
}
