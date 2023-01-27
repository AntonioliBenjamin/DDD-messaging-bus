"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageIdentifiers = void 0;
class MessageIdentifiers {
    static EventReceiver = Symbol.for("EventReceiver");
    static EventDispatcher = Symbol.for("EventDispatcher");
}
exports.MessageIdentifiers = MessageIdentifiers;
