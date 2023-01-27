import { EventReceiver } from "../../core/messages/EventReceiver";
import * as amqp from "amqplib";
export declare class RabbitMqEventReceiver implements EventReceiver {
    private readonly connection;
    constructor(connection: amqp.Connection);
    init(): Promise<void>;
}
