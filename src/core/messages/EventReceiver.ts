export interface EventReceiver {
    init(): Promise<void>
}