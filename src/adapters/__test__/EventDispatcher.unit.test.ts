import "reflect-metadata";
import { DomainEvent } from "../../core/entities/DomainEvent";
import { EventDispatcher } from "../../core/messages/EventDispatcher";
import { EventHandler } from "../../core/messages/EventHandler";
import { EventHandlerRegistry } from "../registry/EventHandlerRegistry";
import { EventReceiver } from "../../core/messages/EventReceiver";
import { build } from "../build";
import { Container } from "inversify";
import { MessageIdentifiers } from "../../core/MessageIdentifiers";
import { RabbitMqConfig } from "../inMemory/config";
import { RabbitMqEventDispatcher } from "../RabbitMq/RabbitMqEventDispatcher";

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

  class UserCreated extends DomainEvent {
    constructor(id: string, name: string) {
      super(id, name);
    }
  }



  const userCreated = new UserCreated("1111", "USER_CREATED");
  
  let eventDispatcher: EventDispatcher;
  let eventReceiver: EventReceiver;
  let container: Container;

  beforeAll(() => {
    container = new Container();
    build(container);
    eventDispatcher = container.get(MessageIdentifiers.EventDispatcher);
    eventReceiver = container.get(MessageIdentifiers.EventReceiver);

    EventHandlerRegistry.register(userCreated, new UserCreatedHandler());

  });

  it("should log event received", async () => {
    const logSpy = jest.spyOn(console, "log");


    const channel = await RabbitMqConfig.init("amqps://xdoesltn:K8V5ZjrCUlIhKwFi6UsyJcEcGZyi8HvT@rattlesnake.rmq.cloudamqp.com/xdoesltn", "new queue")

    const test = new RabbitMqEventDispatcher(channel)

    const domainEvent = new DomainEvent("13354", "USER_CREATED")




    await eventReceiver.init();

    //await eventDispatcher.dispatch(domainEvent);
    await test.dispatch(domainEvent)


    expect(logSpy).toHaveBeenCalledTimes(1);
  });
});