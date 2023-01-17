import { DomainEvent } from "./DomainEvent";
import { EventEmitter } from "node:events";
import { inject, injectable } from "inversify";
import { identifiers } from "./identifiers";

export class InMemoryEventDispatcher {
  constructor(
   private readonly eventEmitter: EventEmitter
    ) {}

  async dispatch(domainEvent: DomainEvent) {
     this.eventEmitter.emit(domainEvent.name)
  }
}