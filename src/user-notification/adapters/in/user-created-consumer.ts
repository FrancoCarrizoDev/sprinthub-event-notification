import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ProcessUserCreatedEventUseCase } from 'src/user-notification/application/usecases/process-user-created-event.usecase';
import { UserCreatedEvent } from 'src/user-notification/domain/events/user-created-event';

@Controller() // Registra esta clase como un controlador en NestJS
export class UserCreatedConsumer {
  constructor(
    private readonly processUserCreatedEventUseCase: ProcessUserCreatedEventUseCase,
  ) {}

  @EventPattern('user.created') // Escucha el tópico `user.created`
  async handleUserCreated(@Payload() message: UserCreatedEvent) {
    await this.processUserCreatedEventUseCase.execute(message);
  }
}
