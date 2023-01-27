"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decoratedEvent = void 0;
function decoratedEvent(value) {
    // this is the decorator factory, it sets up
    // the returned decorator function
    return function (target) {
        target.eventName = value;
        // console.log(target.name.eventName)
        // console.log(target)
        // this is the decorator
        // do something with 'target' and 'value'...
    };
}
exports.decoratedEvent = decoratedEvent;
