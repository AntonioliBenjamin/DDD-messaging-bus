export function decoratedEvent(value: string) {
    // this is the decorator factory, it sets up
    // the returned decorator function
    return function (target) {
        target.eventName = value
        // this is the decorator
        // do something with 'target' and 'value'...
    };
}