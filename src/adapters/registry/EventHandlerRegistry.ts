import {EventHandler} from "../../core/messages/EventHandler";

export type GetAllOutput = {
    eventName: string,
    eventHandler: EventHandler
}

export class EventHandlerRegistry {
    static registry: Map<string, EventHandler> = new Map();

    static register(eventName: string, eventHandler: EventHandler): void {
        this.registry.set(eventName, eventHandler);
        return
    }

    static get(eventName: string) : EventHandler{
        return this.registry.get(eventName)
    }

    static getAll() : [{ [k: string]: EventHandler; }] {
        return [Object.fromEntries(this.registry)]
    }
}