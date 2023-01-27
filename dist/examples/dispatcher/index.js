"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyDomainEvent = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const ddd_messaging_bus_1 = require("ddd-messaging-bus");
const ddd_messaging_bus_2 = require("ddd-messaging-bus");
const inversify_1 = require("inversify");
const app = (0, express_1.default)();
const port = 3000;
const container = new inversify_1.Container();
const urlAmqp = "YOUR AMQP URL";
class MyDomainEvent extends ddd_messaging_bus_1.DomainEvent {
    constructor(props) {
        super(props);
    }
}
exports.MyDomainEvent = MyDomainEvent;
async function init() {
    await (0, ddd_messaging_bus_2.rabbitMqBuild)(container, urlAmqp);
}
async function dispatch() {
    const myDomainEvent = new MyDomainEvent({
        email: 'toto@gmail.com',
        userName: 'toto'
    });
    const eventDispatcher = container.get(ddd_messaging_bus_2.MessageIdentifiers.EventDispatcher);
    await eventDispatcher.dispatch(myDomainEvent);
    console.log("dispatched");
}
init().then(r => dispatch());
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
