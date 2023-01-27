import { DomainEvent } from "../../core/entities/DomainEvent";
export type UserCreatedProperties = {
    firstName: string;
    lastName: string;
    email: string;
};
export declare class UserCreated extends DomainEvent<UserCreatedProperties> {
    constructor(props: UserCreatedProperties);
}
