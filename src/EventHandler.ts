import { EventEmitter } from "node:events";
import { DomainEvent } from "./DomainEvent";

export class EventHandler {
  constructor(private readonly eventEmitter: EventEmitter) {}

  async handle(eventName: string): Promise<void> {
    this.eventEmitter.on(eventName, () => {

    });
  }
}