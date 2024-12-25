import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { IEmailService } from '../domain/IEmailService';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SendGridService implements IEmailService {
  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('SENDGRID_API_KEY');
    sgMail.setApiKey(apiKey);
  }

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<void> {
    const msg = {
      to,
      from: process.env.FROM_EMAIL, // Remitente verificado
      subject,
      text,
      html,
    };

    try {
      await sgMail.send(msg);
      console.log('Correo enviado correctamente');
    } catch (error) {
      console.error('Error enviando correo:', error);
      if (error.response) {
        console.error(error.response.body);
      }
      throw new Error('No se pudo enviar el correo.');
    }
  }
}
