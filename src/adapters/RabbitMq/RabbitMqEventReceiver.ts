import { injectable } from "inversify";
import { EventReceiver } from "../../core/messages/EventReceiver";
import { EventHandlerRegistry } from "../registry/EventHandlerRegistry";
import * as amqp from "amqplib";
import { logger } from "../../logger";

@injectable()
export class RabbitMqEventReceiver implements EventReceiver {
  constructor(private readonly connection: amqp.Connection) {}

  async init(): Promise<void> {
    const eventNames = EventHandlerRegistry.getAllEventNames();
    const channel = await this.connection.createChannel();

    for (const eventName of eventNames) {
      await channel.assertQueue(eventName, {
        durable: true,
      });

      await channel.consume(eventName, async (message) => {
        const domainEvent = JSON.parse(message.content.toString());
        const eventHandlers = EventHandlerRegistry.getEventHandler(eventName);

        for (const eventHandler of eventHandlers) {
          try {
            await eventHandler.handle(domainEvent);
            channel.ack(message);
          } catch (err) {
            logger.error(err);
            channel.ack(message);
          }
        }
      });
    }
  }
}
