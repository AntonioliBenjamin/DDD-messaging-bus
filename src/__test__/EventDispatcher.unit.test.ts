import {InMemoryEventsReceiver} from "../adapters/inMemory/InMemoryEventsReceiver";
import {InMemoryEventDispatcher} from "../adapters/inMemory/InMemoryEventDispatcher";
import {EventEmitter} from "node:events";
import {DomainEvent} from "../core/entities/DomainEvent";
import {EventDispatcher} from "../core/messages/EventDispatcher";
import {EventHandler} from "../core/messages/EventHandler";
import {EventHandlerRegistry} from "../adapters/registry/EventHandlerRegistry";
import { EventReceiver } from "../core/messages/EventReceiver";

const userCreated = new DomainEvent("1234", "USER_CREATED");

class UserCreated implements DomainEvent {
    createdAt: Date;
    id: string;
    name: string;
}

class UserCreatedHandler implements EventHandler {

    handle(domainEvent: DomainEvent): Promise<void> {
        console.log("Event Received")
        return Promise.resolve(undefined);
    }
}

describe(" Unit - InMemoryEventDispatcher", () => {
    let eventDispatcher: EventDispatcher
    let eventHandler: EventReceiver

    beforeAll(() => {
        const eventEmitter = new EventEmitter();

        eventDispatcher = new InMemoryEventDispatcher(eventEmitter);
        eventHandler = new InMemoryEventsReceiver(eventEmitter);

        EventHandlerRegistry.register(userCreated.name, new UserCreatedHandler());
    })

    it("should log date and id", async () => {
        console.log(EventHandlerRegistry.getAllEventName())

        const domainEvent: DomainEvent = {
            createdAt: new Date(),
            id: "13354",
            name: "name",
        };

        await eventHandler.init();

        await eventDispatcher.dispatch(domainEvent);
    });
});