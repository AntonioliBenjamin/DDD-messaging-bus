import { inject, injectable } from "inversify";
import { EventEmitter } from "node:events";
import { DomainEvent } from "./DomainEvent";
import { EventHandler } from "./EventHandler";
import { identifiers } from "./identifiers";



export class InMemoryEventHandler {
  constructor(
    private readonly eventEmitter: EventEmitter
    ) {}

  async handle(domainEvent: DomainEvent): Promise<void> {
    this.eventEmitter.on(domainEvent.name, () => {
      console.log("ok")
    });
  }
}