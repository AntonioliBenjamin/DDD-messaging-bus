export function decoratedEvent(value: string) {
    return function (target) {
        target.eventName = value
    };
}
