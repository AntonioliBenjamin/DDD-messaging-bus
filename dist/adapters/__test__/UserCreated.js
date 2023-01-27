"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreated = void 0;
const DomainEvent_1 = require("../../core/entities/DomainEvent");
class UserCreated extends DomainEvent_1.DomainEvent {
    constructor(props) {
        super(props);
    }
}
exports.UserCreated = UserCreated;
