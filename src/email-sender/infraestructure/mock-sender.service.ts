import { Injectable } from '@nestjs/common';
import { IEmailService } from '../domain/IEmailService';

@Injectable()
export class MockEmailService implements IEmailService {
  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<void> {
    console.log(`Correo simulado enviado a ${to} con asunto "${subject}"`);
  }
}
