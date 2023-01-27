/// <reference types="node" />
import { EventEmitter } from "node:events";
import { EventReceiver } from "../../core/messages/EventReceiver";
export declare class InMemoryEventsReceiver implements EventReceiver {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter);
    init(): Promise<void>;
}
