import { Inject, Injectable } from '@nestjs/common';
import { UserCreatedEvent } from '../../domain/events/user-created-event';
import { UserNotification } from 'src/user-notification/domain/models/user-notification.entity';
import { NotificationRepository } from 'src/user-notification/infraestructure/database/notification.repository';
import { EmailServiceTokens } from 'src/email-sender/domain/email.tokens';
import { IEmailService } from 'src/email-sender/domain/IEmailService';

@Injectable()
export class ProcessUserCreatedEventUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    @Inject(EmailServiceTokens.SendGrid)
    private readonly emailSender: IEmailService,
  ) {}

  async execute(event: UserCreatedEvent): Promise<void> {
    const notification = new UserNotification(
      event.userId,
      event.email,
      event.verificationCode,
    );
    await this.notificationRepository.save(notification);

    // Enviar correo de bienvenida
    const subject = 'Bienvenido a la plataforma';
    const text = `Hola ${event.email}, tu código de verificación es: ${event.verificationCode}.`;

    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Bienvenido a SprintHub</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              font-family: Arial, sans-serif;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 8px;
              padding: 20px;
            }
            .header {
              text-align: center;
              background-color: #0A66C2;
              color: #ffffff;
              padding: 20px;
              border-radius: 8px 8px 0 0;
            }
            .header h1 {
              margin: 0;
            }
            .content {
              padding: 20px;
              text-align: center;
            }
            .content p {
              font-size: 16px;
              color: #333333;
              margin: 0 0 15px 0;
            }
            .verification-code {
              font-size: 24px;
              font-weight: bold;
              color: #0A66C2;
              margin-top: 5px;
            }
            .footer {
              text-align: center;
              font-size: 14px;
              color: #888888;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Bienvenido a SprintHub!</h1>
            </div>
            <div class="content">
              <p>Hola ${event.email},</p>
              <p>Gracias por registrarte en nuestra plataforma. ¡Estamos muy contentos de que te hayas unido!</p>
              <p>Tu código de verificación es:</p>
              <p class="verification-code">${event.verificationCode}</p>
            </div>
            <div class="footer">
              <p>Si no solicitaste este correo, puedes ignorarlo con confianza.</p>
              <p>&copy; 2023 SprintHub. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
      </html>
      `;
    await this.emailSender.sendEmail(event.email, subject, text, htmlBody);
  }
}
