import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserNotification,
  UserNotificationSchema,
} from './domain/models/user-notification.entity';
import { NotificationRepository } from './infraestructure/database/notification.repository';
import { ProcessUserCreatedEventUseCase } from './application/usecases/process-user-created-event.usecase';

import { UserCreatedConsumer } from './adapters/in/user-created-consumer';
import { EmailSenderModule } from 'src/email-sender/email-sender.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserNotification.name, schema: UserNotificationSchema },
    ]),
    EmailSenderModule,
  ],
  providers: [NotificationRepository, ProcessUserCreatedEventUseCase],
  controllers: [UserCreatedConsumer],
})
export class UserNotificationModule {}
