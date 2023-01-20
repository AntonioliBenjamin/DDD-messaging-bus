import {DomainEvent} from "../entities/DomainEvent";

export interface EventDispatcher{
    dispatch(domainEvent : DomainEvent<any>)
}