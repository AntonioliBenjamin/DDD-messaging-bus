import {EventHandler} from "../../core/messages/EventHandler";

declare type Class<T = any> = new (...args: any[]) => T;

export class EventHandlerRegistry {
    static registry: Map<string, EventHandler> = new Map();

    static register(domainEvent: Class, eventHandler: EventHandler): void {
        this.registry.set(domainEvent.name, eventHandler);
        return
    }

    static getAllEventNames(): string[] {
        return [...this.registry.keys()]
    }

    static getEventHandler(eventName: string): EventHandler {
        return this.registry.get(eventName)
    }
}