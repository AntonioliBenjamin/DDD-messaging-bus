import {EventEmitter} from "node:events";
import {injectable} from "inversify";
import {DomainEvent} from "../../core/entities/DomainEvent";
import {EventHandlerRegistry} from "../registry/EventHandlerRegistry";
import {EventReceiver} from "../../core/messages/EventReceiver";

@injectable()
export class InMemoryEventsReceiver implements EventReceiver {
    constructor(private readonly eventEmitter: EventEmitter) {
    }

    async init(): Promise<void> {
        const eventNames = EventHandlerRegistry.getAllEventNames();
        for (const eventName of eventNames) {
            this.eventEmitter.on(eventName, (domainEvent: DomainEvent<any>) => {
                    const eventHandlers = EventHandlerRegistry.getEventHandler(eventName);
                    return eventHandlers.map(elem => elem.handle(domainEvent));
                }
            )
        }
    }
}