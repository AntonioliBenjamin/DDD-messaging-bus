import { DomainEvent } from "./DomainEvent";
import { EventEmitter } from "node:events";

export class EventDispatcher {
  constructor(private readonly eventEmitter: EventEmitter) {}

  async dispatch(domainEvent: DomainEvent) {
     this.eventEmitter.emit(domainEvent.name)
  }
}