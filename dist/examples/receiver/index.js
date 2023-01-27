"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyDomainEvent = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const ddd_messaging_bus_1 = require("ddd-messaging-bus");
const inversify_1 = require("inversify");
const app = (0, express_1.default)();
const port = 4000;
const container = new inversify_1.Container();
const urlAmqp = "YOUR AMQP URL";
class MyDomainEvent extends ddd_messaging_bus_1.DomainEvent {
    constructor(props) {
        super(props);
    }
}
exports.MyDomainEvent = MyDomainEvent;
class MyDomainEventHandler {
    async handle(domainEvent) {
        console.log(domainEvent);
        return;
    }
}
async function init() {
    await (0, ddd_messaging_bus_1.rabbitMqBuild)(container, urlAmqp);
    ddd_messaging_bus_1.EventHandlerRegistry.register(MyDomainEvent, new MyDomainEventHandler());
    const eventReceiver = container.get(ddd_messaging_bus_1.MessageIdentifiers.EventReceiver);
    await eventReceiver.init();
    console.log("Event successfully handled");
}
init();
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
