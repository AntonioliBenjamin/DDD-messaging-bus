import "reflect-metadata";
import { DomainEvent } from "ddd-messaging-bus";
export type YourDomainEventProperties = {
    userName: string;
    email: string;
};
export declare class MyDomainEvent extends DomainEvent<YourDomainEventProperties> {
    constructor(props: YourDomainEventProperties);
}
