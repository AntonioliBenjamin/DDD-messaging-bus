export declare abstract class DomainEvent<T> {
    props: T;
    id: string;
    createdAt: Date;
    static eventName: string;
    constructor(props: T);
}
