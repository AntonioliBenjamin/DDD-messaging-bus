import {v4} from 'uuid'

export abstract class DomainEvent<T> {
    props: T
    id: string
    createdAt: Date
    static eventName: string

    constructor(props: T) {
        this.props = props;
        this.id = v4();
        this.createdAt = new Date()
    }
}
