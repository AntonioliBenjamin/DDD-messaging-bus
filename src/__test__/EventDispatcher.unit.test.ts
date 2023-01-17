import { InMemoryEventsReceiver } from "../adapters/inMemory/InMemoryEventsReceiver";
import { InMemoryEventDispatcher } from "../adapters/inMemory/InMemoryEventDispatcher";
import { EventEmitter } from "node:events";
import { DomainEvent } from "../core/entities/DomainEvent";
import { EventDispatcher } from "../core/messages/EventDispatcher";
import { EventHandler } from "../core/messages/EventHandler";
import { EventHandlerRegistry } from "../adapters/registry/EventHandlerRegistry";
import { EventReceiver } from "../core/messages/EventReceiver";

const userCreated = new DomainEvent("1234", "USER_CREATED");

const userDeleted = new DomainEvent("1111", "USER_DELETE");

class UserCreatedHandler implements EventHandler {
  handle(domainEvent: DomainEvent): Promise<void> {
    console.log("Event Received");
    return Promise.resolve(undefined);
  }
}

class UserDeleted implements EventHandler {
  handle(domainEvent: DomainEvent): Promise<void> {
    console.log("User deleted ");
    return Promise.resolve(undefined);
  }
}

describe(" Unit - InMemoryEventDispatcher", () => {
  let eventDispatcher: EventDispatcher;
  let eventHandler: EventReceiver;

  beforeAll(() => {
    const eventEmitter = new EventEmitter();

    eventDispatcher = new InMemoryEventDispatcher(eventEmitter);
    eventHandler = new InMemoryEventsReceiver(eventEmitter);

    EventHandlerRegistry.register(userCreated.name, new UserCreatedHandler());
    EventHandlerRegistry.register(userDeleted.name, new UserDeleted());
  });

  it("should log event received", async () => {
    const logSpy = jest.spyOn(console, "log");
    console.log(EventHandlerRegistry.getAll())
    const domainEvent: DomainEvent = {
      createdAt: new Date(),
      id: "13354",
      name: "USER_CREATED",
    };

    const domainEvent1: DomainEvent = {
        createdAt: new Date(),
        id: "1111",
        name: "USER_DELETED",
      };

    await eventHandler.init();

    await eventDispatcher.dispatch(domainEvent);
    await eventDispatcher.dispatch(domainEvent1);

    expect(logSpy).toHaveBeenCalledWith("Event Received");
  });
});
