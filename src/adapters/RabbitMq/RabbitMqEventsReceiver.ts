import { EventReceiver } from "../../core/messages/EventReceiver";
import * as amqp from 'amqplib';
import { EventHandlerRegistry } from "../registry/EventHandlerRegistry";
import { DomainEvent } from "../../core/entities/DomainEvent";

export class RabbitMqEventsReceiver implements EventReceiver {
    constructor(
        private readonly channel : amqp.Channel
    ) {}

    async init(): Promise<void> {
        const handlers = EventHandlerRegistry.getAll();

        for (const handler of handlers) {
            await this.channel.consume(handler.eventName, (msg) => {
                // const eventHandler = EventHandlerRegistry.get(domainEvent.name)
                // return eventHandler.handle(domainEvent);
              }
            )
          }
    }
    
}