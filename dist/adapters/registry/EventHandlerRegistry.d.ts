import { EventHandler } from "../../core/messages/EventHandler";
declare type Class<T = any> = new (...args: any[]) => T;
export declare class EventHandlerRegistry {
    static registry: Map<string, EventHandler[]>;
    static register(domainEvent: Class, eventHandler: EventHandler): void;
    static getAllEventNames(): string[];
    static getEventHandler(eventName: string): EventHandler[];
}
export {};
