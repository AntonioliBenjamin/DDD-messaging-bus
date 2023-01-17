import {DomainEvent} from "../../core/entities/DomainEvent";
import {EventHandler} from "../../core/messages/EventHandler";

export class EventHandlerRegistry {
    static registry: Map<string, EventHandler> = new Map();

    static register(eventName: string, eventHandler: EventHandler): void {
        this.registry.set(eventName, eventHandler);
        console.log(this.registry)
        return
    }

    static get(eventName: string) : EventHandler{
        return this.registry.get(eventName)
    }

    static getAllEventName() : string[] {
        return  [...this.registry.keys()]
    }
}