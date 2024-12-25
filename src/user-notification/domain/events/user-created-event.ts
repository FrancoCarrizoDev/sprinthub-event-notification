import { BaseEvent } from '../models/base-event';

export class UserCreatedEvent extends BaseEvent {
  userId: string;
  email: string;
  verificationCode: string;

  constructor(userId: string, email: string, verificationCode: string) {
    super();
    this.userId = userId;
    this.email = email;
    this.verificationCode = verificationCode;
  }

  static fromKafkaMessage(message: any): UserCreatedEvent {
    return new UserCreatedEvent(
      message.userId,
      message.email,
      message.verificationCode,
    );
  }
}
