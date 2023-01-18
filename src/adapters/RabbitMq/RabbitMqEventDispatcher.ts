import { DomainEvent } from "../../core/entities/DomainEvent";
import { EventDispatcher } from "../../core/messages/EventDispatcher";
import * as amqp from 'amqplib';

export class RabbitMqEventDispatcher implements EventDispatcher {
    constructor(
        private readonly channel: amqp.Channel
    ) {}

    async dispatch(domainEvent: DomainEvent) {
        const result = JSON.stringify(domainEvent)
        this.channel.sendToQueue(domainEvent.name, Buffer.from(result))
    }
}