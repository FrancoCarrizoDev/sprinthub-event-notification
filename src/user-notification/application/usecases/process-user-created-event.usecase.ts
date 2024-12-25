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
    const text = `Hola ${event.email}, gracias por registrarte en la plataforma.`;
    await this.emailSender.sendEmail(event.email, subject, text);
  }
}
