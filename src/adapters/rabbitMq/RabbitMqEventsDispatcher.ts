import {injectable} from "inversify";
import {EventDispatcher} from "../../core/messages/EventDispatcher";
import * as amqp from 'amqplib';
import {DomainEvent} from "../../core/entities/DomainEvent";
import {v4} from "uuid";

@injectable()
export class RabbitMqEventDispatcher implements EventDispatcher {
    constructor(
        private readonly connection: amqp.Connection
    ) {}
    
    async dispatch(domainEvent: DomainEvent<any>) {
        const channel = await this.connection.createChannel();
        const queue = domainEvent.constructor["eventName"];
        const exchanger = 'messages_bus';
        const partitionKeyId = v4();
        
        await channel.assertExchange(exchanger, 'direct', {durable: true}).catch(console.error);
        await channel.assertQueue(queue, {durable: true});
        await channel.bindQueue(queue, exchanger, partitionKeyId); 

        channel.publish(exchanger, partitionKeyId, Buffer.from(JSON.stringify(domainEvent)));
    }
}