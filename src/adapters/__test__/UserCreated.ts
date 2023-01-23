import {DomainEvent} from "../../core/entities/DomainEvent";
import {decoratedEvent} from "../../core/decorators/decoratedEvent";

export type UserCreatedProperties = {
    firstName: string;
    lastName: string;
    email: string;
}

export class UserCreated extends DomainEvent<UserCreatedProperties> {
    
    constructor(props: UserCreatedProperties) {
        super(props)
    }
}