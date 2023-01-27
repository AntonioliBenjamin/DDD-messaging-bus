import { DomainEvent } from "../entities/DomainEvent";
export interface EventHandler {
    handle(domainEvent: DomainEvent<any>): Promise<void>;
}
