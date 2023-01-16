import { EventHandler } from "../EventHandler";
import { EventDispatcher } from "../EventDispatcher";
import { EventEmitter } from "node:events";
import { DomainEvent } from "../DomainEvent";

describe(" Unit - EventDispatcher", () => {
  it("should log date and id", async () => {
    const logSpy = jest.spyOn(console, "log");

    const eventEmitter = new EventEmitter();
    const eventDispatcher = new EventDispatcher(eventEmitter);
    const eventHandler = new EventHandler(eventEmitter);

    const domainEvent: DomainEvent = {
      createdAt: new Date(),
      id: "13354",
      name: "name",
    };

    const test = async () => {
      await eventHandler.handle(domainEvent);
    };

    await test();

    await eventDispatcher.dispatch(domainEvent);

    expect(logSpy).toHaveBeenCalled()
  });
});
