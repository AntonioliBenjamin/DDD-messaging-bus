import {EventEmitter} from "node:events";
import {injectable} from "inversify";
import {DomainEvent} from "../../core/entities/DomainEvent";
import {EventHandlerRegistry} from "../registry/EventHandlerRegistry";
import { EventReceiver } from "../../core/messages/EventReceiver";


export class InMemoryEventsReceiver implements EventReceiver {

    constructor(
        private readonly eventEmitter : EventEmitter
    ) {
    }

    async init(): Promise<void> {
        const eventHandlers = EventHandlerRegistry.getAll()

        for (let i = 0; i < eventHandlers.length; i++) {
            const currentEventName = Object.keys(eventHandlers[i])[0]
            const currentEventHandler = eventHandlers[i][currentEventName]
            
            this.eventEmitter.on(currentEventName, (domainEvent: DomainEvent) => {
            return currentEventHandler.handle(domainEvent)
            })
        }
        return
    }
}

