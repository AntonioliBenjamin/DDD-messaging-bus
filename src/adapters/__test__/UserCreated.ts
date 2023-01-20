import {DomainEvent} from "../../core/entities/DomainEvent";
import {decoratedEvent} from "../../core/decorators/decoratedEvent";

export type UserCreatedProperties = {
    firstName: string;
    lastName: string;
    email: string;
}

export class UserCreated extends DomainEvent<UserCreatedProperties> {
    static eventName = "USER_CREATED";
    
    constructor(props: UserCreatedProperties) {
        super(props)
    }
}