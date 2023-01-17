import {DomainEvent} from "../../core/entities/DomainEvent";
import {EventEmitter} from "node:events";
import {injectable} from "inversify";

@injectable()
export class InMemoryEventDispatcher {
    constructor(private readonly eventEmitter: EventEmitter
    ) {
    }

    async dispatch(domainEvent: DomainEvent) {
        this.eventEmitter.emit(domainEvent.name)
    }
}