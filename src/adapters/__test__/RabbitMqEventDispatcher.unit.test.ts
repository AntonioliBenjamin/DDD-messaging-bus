import 'reflect-metadata';
require('dotenv').config();
import {EventDispatcher} from "../../core/messages/EventDispatcher";
import {EventHandler} from "../../core/messages/EventHandler";
import {EventHandlerRegistry} from "../registry/EventHandlerRegistry";
import {EventReceiver} from "../../core/messages/EventReceiver";
import { rabbitMqBuild} from "../build";
import {Container} from "inversify";
import {MessageIdentifiers} from "../../core/MessageIdentifiers";
import {UserCreated} from "./UserCreated";

class UserCreatedHandler implements EventHandler {
    handle(domainEvent: UserCreated): Promise<void> {
        console.log(domainEvent);
        return Promise.resolve(undefined);
    }
}

async function delay(timeMS: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, timeMS));
}
jest.setTimeout(1000000)

describe(" Unit - RabbitMqEventDispatcher", () => {
    let eventDispatcher: EventDispatcher;
    let eventReceiver: EventReceiver;

    beforeAll(async () => {

        const container = new Container();
        await rabbitMqBuild(container);
        eventDispatcher = container.get(MessageIdentifiers.EventDispatcher);
        eventReceiver = container.get(MessageIdentifiers.EventReceiver);

        EventHandlerRegistry.register(UserCreated, new UserCreatedHandler());
        await eventReceiver.init();
    });

    it("should log event received", async () => {
        const logSpy = jest.spyOn(console, "log");

        const userCreated = new UserCreated({
            firstName: "John",
            email : "john@example.com",
            lastName : "John",
        })

        await eventDispatcher.dispatch(userCreated);
        await delay(10000)

        expect(logSpy).toHaveBeenCalledTimes(1)
    });
});