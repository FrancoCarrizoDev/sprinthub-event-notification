import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserNotification } from 'src/user-notification/domain/models/user-notification.entity';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(UserNotification.name)
    private readonly notificationModel: Model<UserNotification>,
  ) {}

  async save(notification: UserNotification): Promise<UserNotification> {
    const createdNotification = new this.notificationModel(notification);
    return createdNotification.save();
  }
}
