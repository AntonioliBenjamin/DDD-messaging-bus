import {DomainEvent} from "../../core/entities/DomainEvent";
import {EventEmitter} from "node:events";
import {injectable} from "inversify";
import {EventDispatcher} from "../../core/messages/EventDispatcher";

@injectable()
export class InMemoryEventDispatcher implements EventDispatcher {
    constructor(private readonly eventEmitter: EventEmitter
    ) {}

    async dispatch(domainEvent: DomainEvent) {
        this.eventEmitter.emit(domainEvent.name, domainEvent)
    }
}