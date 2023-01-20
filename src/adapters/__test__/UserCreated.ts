import {DomainEvent} from "../../core/entities/DomainEvent";
import {decoratedEvent} from "../../core/decorators/decoratedEvent";

export type UserCreatedProperties = {
    id: string;
    createdAt: Date;
    firstName: string;
    lastName: string;
    email: string;
}

@decoratedEvent("USER_CREATED")
export class UserCreated extends DomainEvent<UserCreatedProperties> {

    constructor(props: UserCreatedProperties) {
        super(props)
    }
}
