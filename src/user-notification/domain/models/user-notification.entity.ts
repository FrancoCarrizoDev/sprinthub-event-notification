import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserNotification {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  verificationCode: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  constructor(userId: string, email: string, verificationCode: string) {
    this.userId = userId;
    this.email = email;
    this.verificationCode = verificationCode;
  }
}
export const UserNotificationSchema =
  SchemaFactory.createForClass(UserNotification);
