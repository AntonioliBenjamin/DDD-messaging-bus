import {injectable} from "inversify";
import {EventReceiver} from "../../core/messages/EventReceiver";
import {EventHandlerRegistry} from "../registry/EventHandlerRegistry";
import * as amqp from 'amqplib';

@injectable()
export class RabbitMqEventsReceiver implements EventReceiver {
    constructor(private readonly connection: amqp.Connection) {
    }

    async init(): Promise<void> {
        const eventNames = EventHandlerRegistry.getAllEventNames();
        const channel = await this.connection.createChannel()

        for (const eventName of eventNames) {
            await channel.assertQueue(eventName, {
                durable: true
            });
            await channel.consume(eventName, async result => {
                    const domainEvent = JSON.parse(result.content.toString())
                    const eventHandler = EventHandlerRegistry.getEventHandler(eventName);
                    await eventHandler.handle(domainEvent);
                    channel.ack(result)
                }
            )
        }
    }
}