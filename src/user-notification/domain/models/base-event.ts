export abstract class BaseEvent {
  eventId: string;
  timestamp: Date;

  constructor() {
    this.eventId = crypto.randomUUID();
    this.timestamp = new Date();
  }
}
