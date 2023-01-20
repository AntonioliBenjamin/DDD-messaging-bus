import {v4} from 'uuid'




export class DomainEvent<T> {
    props: T
    id: string
    createdAt: Date
    name: string

    constructor(props: T) {
        this.props = props;
        this.id = v4();
        this.createdAt = new Date()
    }
}
