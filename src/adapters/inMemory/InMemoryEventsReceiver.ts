import { EventEmitter } from "node:events";
import { injectable } from "inversify";
import { DomainEvent } from "../../core/entities/DomainEvent";
import { EventHandlerRegistry } from "../registry/EventHandlerRegistry";
import { EventReceiver } from "../../core/messages/EventReceiver";

@injectable()
export class InMemoryEventsReceiver implements EventReceiver {
  constructor(private readonly eventEmitter: EventEmitter) {}

  async init(): Promise<void> {
    const handlers = EventHandlerRegistry.getAll();

    for (const handler of handlers) {
        this.eventEmitter.on(handler.eventName, (domainEvent: DomainEvent) => {
            const eventHandler = EventHandlerRegistry.get(domainEvent.name)
            return eventHandler.handle(domainEvent);
          }
        )
      }
  }
}