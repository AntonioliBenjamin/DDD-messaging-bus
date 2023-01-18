import {Container} from "inversify";
import {MessageIdentifiers} from "../core/MessageIdentifiers";
import {InMemoryEventDispatcher} from "./inMemory/InMemoryEventDispatcher";
import {EventEmitter} from "node:events";
import {InMemoryEventsReceiver} from "./inMemory/InMemoryEventsReceiver";

export function build(myContainer: Container) {
    const eventEmitter = new EventEmitter();
    myContainer.bind(MessageIdentifiers.EventDispatcher).toConstantValue(new InMemoryEventDispatcher(eventEmitter));
    myContainer.bind(MessageIdentifiers.EventReceiver).toConstantValue(new InMemoryEventsReceiver(eventEmitter));
}
