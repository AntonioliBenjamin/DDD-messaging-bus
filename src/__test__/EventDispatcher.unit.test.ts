import { EventEmitter } from "node:events";
import { DomainEvent } from "../DomainEvent";
import { InMemoryEventDispatcher } from "../InMemoryEventDispatcher";
import { InMemoryEventHandler } from "../InMemoryEventHandler";

describe(" Unit - EventDispatcher", () => {
  it("should log date and id", async () => {
    const logSpy = jest.spyOn(console, "log");

    const eventEmitter = new EventEmitter();
    const inMemoryEventDispatcher = new InMemoryEventDispatcher(eventEmitter)
    const inMemoryEventHandler = new InMemoryEventHandler(eventEmitter)

    const domainEvent: DomainEvent = {
      createdAt: new Date(),
      id: "13354",
      name: "name",
    };

    await inMemoryEventHandler.handle(domainEvent)

    await inMemoryEventDispatcher.dispatch(domainEvent)

    expect(logSpy).toHaveBeenCalled()
  });
});