import { Module } from '@nestjs/common';
import { SendEmailUseCase } from './application/send-email-use-case';
import { SendGridModule } from './infraestructure/send-grid.module';
import { SendGridService } from './infraestructure/send-grid.service';
import { EmailServiceTokens } from './domain/email.tokens';
import { IEmailService } from './domain/IEmailService';
import { MockEmailService } from './infraestructure/mock-sender.service';

@Module({
  imports: [SendGridModule],
  providers: [
    { provide: EmailServiceTokens.SendGrid, useClass: SendGridService }, // Implementación de SendGrid
    { provide: EmailServiceTokens.Mock, useClass: MockEmailService }, // Implementación Mock
    {
      provide: EmailServiceTokens.IEmailService,
      useFactory: (
        sendGridService: IEmailService,
        mockEmailService: IEmailService,
      ) => {
        const useMock = process.env.USE_MOCK_EMAIL === 'true';
        return useMock ? mockEmailService : sendGridService;
      },
      inject: [EmailServiceTokens.SendGrid, EmailServiceTokens.Mock], // Inyecta ambas implementaciones
    },
  ],
  exports: [
    EmailServiceTokens.IEmailService,
    EmailServiceTokens.SendGrid,
    EmailServiceTokens.Mock,
  ],
})
export class EmailSenderModule {}
