# DDD - Messaging - Bus

  Domain event manager for all types of architecture ideally used in symbiosis with the DDD pattern

##   Advantages
  
- Quick setup
- Native support for your DI container
-  Several adapters available: RabbitMq and EventEmitter
-  Types available

## Installation 
```sh
npm install inversify amqplib reflect-metadata winston uuid ddd-messaging-bus --save
```
or 
```sh
yarn add inversify amqplib reflect-metadata winston uuid ddd-messaging-bus --save
```
## Definitions
**Domain event**: emitting a domain event is the act of notifying one or more systems that an action has occurred.
  
**Event dispatcher**: event sender, responsible for notifying the system of a past event.

**Event receiver**: event receiver, responsible for receiving an event propagated by the dispatcher

## How to use 

 **- Create your DomainEvent.**

> Extending the DomainEvent Class will generate an id and a creation date.

```
import {DomainEvent} from "ddd-messaging-bus"

export type YourDomainEventProperties = {
    //Write your types, example:
    //userName: string;
    //email: string;
}

export class YourDomainEvent extends DomainEvent<YourDomainEventProperties > {
    constructor(props: YourDomainEventProperties ) {
        super(props)
    }
}
```

   

 **- Create your EventHandler.**



```
import { EventHandler } from "ddd-messaging-bus"
import { injectable } from "inversify";
import { identifiers } from "../../core/identifiers/identifiers";

@injectable()
export class YourEventHandler implements EventHandler {

    async handle(domainEvent: YourDomainEvent): Promise<void> {
	    //Write your code, example:
        //console.log(`this is my domain event : ${domainEvent}`)
    }
}
```

 **- Setup with your container**

> Choose between building inMemory and rabbitMq

```
import {EventHandlerRegistry, EventReceiver, rabbitMqBuild, inMemoryBuild, MessageIdentifiers} from "ddd-messaging-bus";
import { Container } from "inversify";
import { YourEventHandler } from "./YOUR_PATH";
import { YourDomainEvent } from "./YOUR_PATH";

class YourContainer extends Container {
	init() {
	
		//Choose your build
		inMemoryBuild(this)
		//Or
		rabbitMqBuild(this, cloudAmqpURL)
		
		EventHandlerRegistry.register(YourDomainEvent, new YourDomainHandler());

		const eventReceiver: EventReceiver = this.get(MessageIdentifiers.EventReceiver);
		await eventReceiver.init()
	}
}
```
**- Setup the index file**
```
//index.ts

const container = new YourContainer()
container.init()

```
**-  Dispatch your event**
```
//Dispatch example in a use case

import {inject, injectable} from "inversify";
import {EventDispatcher, MessageIdentifiers} from "ddd-messaging-bus"
import { YourDomainEvent } from "./YOUR_PATH";

@injectable()
export class YourUseCase {
    constructor(@inject(MessageIdentifiers.EventDispatcher) private readonly eventDispatcher: EventDispatcher) 
    {}
    	
    async execute(): Promise<User> {
      const yourDomainEvent = new DomainEvent({
      //Example:
      //userName: "John-Doe",
      //email: "JohnDoe@foo.com"
      })
      
    }
}
```

  



##  Library dependencies

  

- [TypeScript](https://www.typescriptlang.org/)

- [Inversify](https://inversify.io/)

- [AmqpLib](https://www.npmjs.com/package/amqplib)

- [Winston](https://www.npmjs.com/package//winston)

- [Reflect Metadata](https://www.npmjs.com/package/reflect-metadata)


## License

  

MIT

  

**Free Software, Callback Hell Yeah !**