"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvent = void 0;
const uuid_1 = require("uuid");
class DomainEvent {
    props;
    id;
    createdAt;
    static eventName;
    constructor(props) {
        this.props = props;
        this.id = (0, uuid_1.v4)();
        this.createdAt = new Date();
    }
}
exports.DomainEvent = DomainEvent;
