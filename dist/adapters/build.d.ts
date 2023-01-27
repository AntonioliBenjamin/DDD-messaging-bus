import { Container } from "inversify";
export declare function inMemoryBuild(myInMemoryContainer: Container): void;
export declare function rabbitMqBuild(myRabbitMqContainer: Container, url: string): Promise<void>;
