import { Container } from "inversify";
import { EventEmitter } from "node:events";
import { identifiers } from "./identifiers";

export class Kernel extends Container {
  init() {
    const eventEmitter = new EventEmitter();
    
    this.bind(identifiers.eventHandlerRegistery).toConstantValue(new Map());
    this.bind(identifiers.eventEmitter).toConstantValue(eventEmitter);
    this.bind(identifiers.inMemoryEventDispatcher).toSelf();
    this.bind(identifiers.inMemoryEventHandler).toSelf();
  }
}
