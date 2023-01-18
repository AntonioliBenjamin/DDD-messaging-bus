import { DomainEvent } from "../../core/entities/DomainEvent";
import {EventHandler} from "../../core/messages/EventHandler";

export type getAllOutput = {
    eventName: string; 
    eventHandler: EventHandler;
}[]

export class EventHandlerRegistry {
    static registry: Map<string, EventHandler> = new Map();

    static register(domainEvent: DomainEvent, eventHandler: EventHandler): void {
        this.registry.set(domainEvent.name, eventHandler);
        return
    }

    static get(eventName: string) : EventHandler {
        return this.registry.get(eventName)
    }

    static getAll() : getAllOutput {
        const values = Object.fromEntries(this.registry)
        return Object.keys(values).map(elm => ({
            eventName: elm,
            eventHandler: values[elm]
        }))
    }
}