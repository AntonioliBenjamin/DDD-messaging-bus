import { injectable } from "inversify";
import { inject } from "inversify/lib/annotation/inject";
import { DomainEvent } from "./DomainEvent";
import { EventHandler } from "./EventHandler";
import { identifiers } from "./identifiers";

export class EventHandlerRegistery {
    constructor(
      private readonly eventDb : Map<string, EventHandler>
    ) {}

    register(domainEvent: DomainEvent, eventHandler: EventHandler) {
        this.eventDb.set(domainEvent.name, eventHandler)
    }
}