import { Inject, Injectable } from '@nestjs/common';
import { IEmailService, IEmailServiceKey } from '../domain/IEmailService';

@Injectable()
export class SendEmailUseCase {
  constructor(
    @Inject(IEmailServiceKey)
    private readonly emailService: IEmailService,
  ) {}

  async execute(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<void> {
    await this.emailService.sendEmail(to, subject, text, html);
  }
}
