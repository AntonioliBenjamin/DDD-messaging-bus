import { EventDispatcher } from "../../core/messages/EventDispatcher";
import * as amqp from 'amqplib';
import { DomainEvent } from "../../core/entities/DomainEvent";
export declare class RabbitMqEventDispatcher implements EventDispatcher {
    private readonly connection;
    constructor(connection: amqp.Connection);
    dispatch(domainEvent: DomainEvent<any>): Promise<void>;
}
