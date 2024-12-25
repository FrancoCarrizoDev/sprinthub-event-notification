import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserNotificationModule } from './user-notification/user-notification.module';
import { EmailSenderModule } from './email-sender/email-sender.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://sprinthub_admin:sprinthub_admin_password@localhost:27017/sprinthub_events?authSource=admin',
    ),
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables sean accesibles en toda la aplicación
    }),
    EmailSenderModule,
    UserNotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
