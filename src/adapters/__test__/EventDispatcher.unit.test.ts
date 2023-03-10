import 'reflect-metadata';
import {EventDispatcher} from "../../core/messages/EventDispatcher";
import {EventHandler} from "../../core/messages/EventHandler";
import {EventHandlerRegistry} from "../registry/EventHandlerRegistry";
import {EventReceiver} from "../../core/messages/EventReceiver";
import {inMemoryBuild} from "../build";
import {Container} from "inversify";
import {MessageIdentifiers} from "../../core/MessageIdentifiers";
import {UserCreated} from "./UserCreated";

class UserCreatedHandler implements EventHandler {
    handle(domainEvent: UserCreated): Promise<void> {
        console.log("User Created In Memory");
        return Promise.resolve(undefined);
    }
}

class SecondUserCreatedHandler implements EventHandler {
    handle(domainEvent: UserCreated): Promise<void> {
        console.log("User Created In Memory two times");
        return Promise.resolve(undefined);
    }
}

describe(" Unit - InMemoryEventDispatcher", () => {
    let eventDispatcher: EventDispatcher;
    let eventReceiver: EventReceiver;

    beforeAll(async () => {
        const container = new Container();
        inMemoryBuild(container);
        eventDispatcher = container.get(MessageIdentifiers.EventDispatcher);
        eventReceiver = container.get(MessageIdentifiers.EventReceiver);

        EventHandlerRegistry.register(UserCreated, new UserCreatedHandler());
        EventHandlerRegistry.register(UserCreated, new SecondUserCreatedHandler());
        await eventReceiver.init();
    });

    it("should log event received", async () => {
        const logSpy = jest.spyOn(console, "log");

        const userCreated = new UserCreated({
            firstName: "John",
            email: "john@example.com",
            lastName: "John",
        })

        await eventDispatcher.dispatch(userCreated);

        expect(logSpy).toHaveBeenCalledTimes(2)
    });
});