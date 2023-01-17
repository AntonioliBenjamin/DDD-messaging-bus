import { DomainEvent } from "./DomainEvent";

export interface EventHandler {
    handle(domainEvent: DomainEvent): Promise<void>
}