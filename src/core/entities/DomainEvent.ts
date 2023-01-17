export class DomainEvent {

    createdAt: Date;
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.createdAt = new Date()
    }
}