import {InMemoryEventsReceiver} from "../adapters/inMemory/InMemoryEventsReceiver";
import {InMemoryEventDispatcher} from "../adapters/inMemory/InMemoryEventDispatcher";
import {EventEmitter} from "node:events";
import {DomainEvent} from "../core/entities/DomainEvent";
import {EventDispatcher} from "../core/messages/EventDispatcher";
import {EventHandler} from "../core/messages/EventHandler";
import {EventHandlerRegistry} from "../adapters/registry/EventHandlerRegistry";

const userCreated = new DomainEvent("1234", "USER_CREATED");

class UserCreated implements DomainEvent {
    createdAt: Date;
    id: string;
    name: string;
}

class UserCreatedHandler implements EventHandler {
    init(domainEvent: DomainEvent): Promise<void> {
        console.log("Event Received")
        return Promise.resolve(undefined);
    }
}

describe(" Unit - InMemoryEventDispatcher", () => {
    let eventDispatcher: EventDispatcher
    let eventHandler: EventHandler

    beforeAll(() => {
        const eventEmitter = new EventEmitter();
        eventDispatcher = new InMemoryEventDispatcher(eventEmitter);
        eventHandler = new InMemoryEventsReceiver(eventEmitter);

        EventHandlerRegistry.register(userCreated.name, new UserCreatedHandler());
    })

    it("should log date and id", async () => {


        const domainEvent: DomainEvent = {
            createdAt: new Date(),
            id: "13354",
            name: "name",
        };

        const test = async () => {
            await eventHandler.init(domainEvent);
        };

        await test();

        await eventDispatcher.dispatch(domainEvent);
    });
});