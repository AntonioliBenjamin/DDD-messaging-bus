import {EventEmitter} from "node:events";
import {injectable} from "inversify";
import {DomainEvent} from "../../core/entities/DomainEvent";
import {EventHandlerRegistry} from "../registry/EventHandlerRegistry";

@injectable()
export class InMemoryEventsReceiver {

    constructor(private readonly eventEmitter: EventEmitter
    ) {
    }

    async init(): Promise<void> {
        //boucle for
        this.eventEmitter.on('USER_CREATED', (domainEvent: DomainEvent) => {
            const eventHandler = EventHandlerRegistry.get(domainEvent.name);
            return eventHandler.handle(domainEvent);
        })
    }
}

//faire l'interface EventsReceiver