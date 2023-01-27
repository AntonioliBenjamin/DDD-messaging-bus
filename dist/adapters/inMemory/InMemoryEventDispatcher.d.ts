/// <reference types="node" />
import { DomainEvent } from "../../core/entities/DomainEvent";
import { EventEmitter } from "node:events";
import { EventDispatcher } from "../../core/messages/EventDispatcher";
export declare class InMemoryEventDispatcher implements EventDispatcher {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter);
    dispatch(domainEvent: DomainEvent<any>): Promise<void>;
}
