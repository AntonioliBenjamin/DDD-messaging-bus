"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitMqBuild = exports.inMemoryBuild = void 0;
const MessageIdentifiers_1 = require("../core/MessageIdentifiers");
const InMemoryEventDispatcher_1 = require("./inMemory/InMemoryEventDispatcher");
const node_events_1 = require("node:events");
const InMemoryEventsReceiver_1 = require("./inMemory/InMemoryEventsReceiver");
const amqplib_1 = __importDefault(require("amqplib"));
const RabbitMqEventDispatcher_1 = require("../adapters/RabbitMq/RabbitMqEventDispatcher");
const RabbitMqEventReceiver_1 = require("./RabbitMq/RabbitMqEventReceiver");
function inMemoryBuild(myInMemoryContainer) {
    const eventEmitter = new node_events_1.EventEmitter();
    myInMemoryContainer.bind(MessageIdentifiers_1.MessageIdentifiers.EventDispatcher).toConstantValue(new InMemoryEventDispatcher_1.InMemoryEventDispatcher(eventEmitter));
    myInMemoryContainer.bind(MessageIdentifiers_1.MessageIdentifiers.EventReceiver).toConstantValue(new InMemoryEventsReceiver_1.InMemoryEventsReceiver(eventEmitter));
}
exports.inMemoryBuild = inMemoryBuild;
async function rabbitMqBuild(myRabbitMqContainer, url) {
    const connection = await amqplib_1.default.connect(url);
    myRabbitMqContainer.bind(MessageIdentifiers_1.MessageIdentifiers.EventDispatcher).toConstantValue(new RabbitMqEventDispatcher_1.RabbitMqEventDispatcher(connection));
    myRabbitMqContainer.bind(MessageIdentifiers_1.MessageIdentifiers.EventReceiver).toConstantValue(new RabbitMqEventReceiver_1.RabbitMqEventReceiver(connection));
}
exports.rabbitMqBuild = rabbitMqBuild;
