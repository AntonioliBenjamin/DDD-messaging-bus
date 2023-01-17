import {DomainEvent} from "../entities/DomainEvent";

export interface EventHandler {
    init (domainEvent :DomainEvent) : Promise<void>;
}