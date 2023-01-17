import {EventEmitter} from "node:events";
import {injectable} from "inversify";
import {DomainEvent} from "../../core/entities/DomainEvent";
import {EventHandlerRegistry} from "../registry/EventHandlerRegistry";


export class InMemoryEventsReceiver {

    constructor(private readonly eventEmitter: EventEmitter
    ) {
    }

    async init(): Promise<void> {
        //boucle for
        const eventHandlers = EventHandlerRegistry.getAllEventName()

        for (const eventHandler of eventHandlers) {
            this.eventEmitter.on(eventHandler, (domainEvent: DomainEvent) => {
             eventHandler.handle(domainEvent);
            })
        }

        this.eventEmitter.on('USER_CREATED', (domainEvent: DomainEvent) => {
            const eventHandler = EventHandlerRegistry.get(domainEvent.name);
            return eventHandler.handle(domainEvent);
        })
    }
}

//faire l'interface EventsReceiver