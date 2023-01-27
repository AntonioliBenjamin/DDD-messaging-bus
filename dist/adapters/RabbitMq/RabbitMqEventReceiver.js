"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMqEventReceiver = void 0;
const inversify_1 = require("inversify");
const EventHandlerRegistry_1 = require("../registry/EventHandlerRegistry");
const amqp = __importStar(require("amqplib"));
const logger_1 = require("../../logger");
let RabbitMqEventReceiver = class RabbitMqEventReceiver {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
    async init() {
        const eventNames = EventHandlerRegistry_1.EventHandlerRegistry.getAllEventNames();
        const channel = await this.connection.createChannel();
        for (const eventName of eventNames) {
            await channel.assertQueue(eventName, {
                durable: true,
            });
            await channel.consume(eventName, async (message) => {
                const domainEvent = JSON.parse(message.content.toString());
                const eventHandlers = EventHandlerRegistry_1.EventHandlerRegistry.getEventHandler(eventName);
                for (const eventHandler of eventHandlers) {
                    try {
                        await eventHandler.handle(domainEvent);
                        channel.ack(message);
                    }
                    catch (err) {
                        logger_1.logger.error(err);
                        channel.ack(message);
                    }
                }
            });
        }
    }
};
RabbitMqEventReceiver = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [Object])
], RabbitMqEventReceiver);
exports.RabbitMqEventReceiver = RabbitMqEventReceiver;
