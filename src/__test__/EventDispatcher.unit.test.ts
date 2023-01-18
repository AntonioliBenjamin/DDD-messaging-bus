import { InMemoryEventsReceiver } from "../adapters/inMemory/InMemoryEventsReceiver";
import { InMemoryEventDispatcher } from "../adapters/inMemory/InMemoryEventDispatcher";
import { EventEmitter } from "node:events";
import { DomainEvent } from "../core/entities/DomainEvent";
import { EventDispatcher } from "../core/messages/EventDispatcher";
import { EventHandler } from "../core/messages/EventHandler";
import { EventHandlerRegistry } from "../adapters/registry/EventHandlerRegistry";
import { EventReceiver } from "../core/messages/EventReceiver";

class UserCreatedHandler implements EventHandler {
  handle(domainEvent: DomainEvent): Promise<void> {
    console.log("User Created");
    return Promise.resolve(undefined);
  }
}

class UserDeletedHandler implements EventHandler {
  handle(domainEvent: DomainEvent): Promise<void> {
    console.log("User deleted");
    console.log(domainEvent)
    return Promise.resolve(undefined);
  }
}

describe(" Unit - InMemoryEventDispatcher", () => {
  const userCreated = new DomainEvent("1234", "USER_CREATED");
  const userDeleted = new DomainEvent("1111", "USER_DELETED");

  let eventDispatcher: EventDispatcher;
  let eventReceiver: EventReceiver;

  beforeAll(() => {
    const eventEmitter = new EventEmitter();

    eventDispatcher = new InMemoryEventDispatcher(eventEmitter);
    eventReceiver = new InMemoryEventsReceiver(eventEmitter);

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