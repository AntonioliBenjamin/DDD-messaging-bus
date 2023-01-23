import {Container} from "inversify";
import {MessageIdentifiers} from "../core/MessageIdentifiers";
import {InMemoryEventDispatcher} from "./inMemory/InMemoryEventDispatcher";
import {EventEmitter} from "node:events";
import {InMemoryEventsReceiver} from "./inMemory/InMemoryEventsReceiver";

import amqp from 'amqplib';
import {RabbitMqEventDispatcher} from "./rabbitMq/RabbitMqEventsDispatcher";
import {RabbitMqEventReceiver} from "./RabbitMq/RabbitMqEventReceiver";



export function inMemoryBuild(myInMemoryContainer: Container) {
    const eventEmitter = new EventEmitter();
    myInMemoryContainer.bind(MessageIdentifiers.EventDispatcher).toConstantValue(new InMemoryEventDispatcher(eventEmitter));
    myInMemoryContainer.bind(MessageIdentifiers.EventReceiver).toConstantValue(new InMemoryEventsReceiver(eventEmitter));
}

export async function rabbitMqBuild(myRabbitMqContainer: Container,url : string) {
    const connection = await amqp.connect(url);
    myRabbitMqContainer.bind(MessageIdentifiers.EventDispatcher).toConstantValue(new RabbitMqEventDispatcher(connection));
    myRabbitMqContainer.bind(MessageIdentifiers.EventReceiver).toConstantValue(new RabbitMqEventReceiver(connection));
}
