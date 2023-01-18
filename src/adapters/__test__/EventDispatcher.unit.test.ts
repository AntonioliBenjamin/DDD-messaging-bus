import 'reflect-metadata';
import {DomainEvent} from "../../core/entities/DomainEvent";
import {EventDispatcher} from "../../core/messages/EventDispatcher";
import {EventHandler} from "../../core/messages/EventHandler";
import {EventHandlerRegistry} from "../registry/EventHandlerRegistry";
import {EventReceiver} from "../../core/messages/EventReceiver";
import {build} from "../build";
import {Container} from "inversify";
import {MessageIdentifiers} from "../../core/MessageIdentifiers";

class UserCreatedHandler implements EventHandler {
    handle(domainEvent: DomainEvent): Promise<void> {
        console.log("User Created");
        return Promise.resolve(undefined);
    }
}

class UserDeletedHandler implements EventHandler {
    handle(domainEvent: DomainEvent): Promise<void> {
        console.log("User deleted");
        return Promise.resolve(undefined);
    }
}

describe(" Unit - InMemoryEventDispatcher", () => {
    const userCreated = new DomainEvent("1234", "USER_CREATED");
    const userDeleted = new DomainEvent("1111", "USER_DELETED");

    let eventDispatcher: EventDispatcher;
    let eventReceiver: EventReceiver;
    let container: Container;

    beforeAll(() => {
        container = new Container();
        build(container);
        eventDispatcher = container.get(MessageIdentifiers.EventDispatcher);
        eventReceiver = container.get(MessageIdentifiers.EventReceiver);

        EventHandlerRegistry.register(userCreated.name, new UserCreatedHandler());
        EventHandlerRegistry.register(userDeleted.name, new UserDeletedHandler());
    });

    it("should log event received", async () => {
        const logSpy = jest.spyOn(console, "log");

        const domainEvent: DomainEvent = {
            createdAt: new Date(),
            id: "13354",
            name: "USER_CREATED",
        };

        const domainEvent2: DomainEvent = {
            createdAt: new Date(),
            id: "13354",
            name: "USER_DELETED",
        };

        await eventReceiver.init();

        await eventDispatcher.dispatch(domainEvent);
        await eventDispatcher.dispatch(domainEvent2);

        expect(logSpy).toHaveBeenCalledTimes(2)
    });
});