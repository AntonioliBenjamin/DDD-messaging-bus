import {EventHandler} from "../../core/messages/EventHandler";
import {logger} from "../../logger";

declare type Class<T = any> = new (...args: any[]) => T;

export class EventHandlerRegistry {
    static registry: Map<string, EventHandler> = new Map();

    static register(domainEvent: Class, eventHandler: EventHandler): void {
        logger.debug(`${domainEvent.name} register with ${eventHandler.constructor.name}`);
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