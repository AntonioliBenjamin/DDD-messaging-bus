"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandlerRegistry = void 0;
const logger_1 = require("../../logger");
class EventHandlerRegistry {
    static registry = new Map();
    static register(domainEvent, eventHandler) {
        logger_1.logger.debug(`${domainEvent.name} register with ${eventHandler.constructor.name}`);
        const eventAlreadyExist = this.registry.get(domainEvent.name);
        if (eventAlreadyExist) {
            eventAlreadyExist.push(eventHandler);
            this.registry.set(domainEvent.name, eventAlreadyExist);
            return;
        }
        this.registry.set(domainEvent.name, [eventHandler]);
        return;
    }
    static getAllEventNames() {
        return [...this.registry.keys()];
    }
    static getEventHandler(eventName) {
        return this.registry.get(eventName);
    }
}
exports.EventHandlerRegistry = EventHandlerRegistry;
