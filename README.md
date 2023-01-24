# DDD - Messaging - Bus

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

DDD-Messaging-Bus is an event manager designed for driven domain design

## Features

- Possibility of building with two different configurations (InMemmory, RabbitMQ)
- Event receiver (InMemmory, RabbitMQ)
- Event dispatcher (InMemmory, RabbitMQ)

## Installation to use in memory  

```sh
npm install inversify reflect-metadata winston uuid ddd-messaging-bus --save
```

## Installation to use with RabbitMQ

```sh
npm install inversify reflect-metadata winston amqplib uuid ddd-messaging-bus --save
```

## Development

import:
```sh
import dmb from 'ddd-messaging-bus'
```

Create an event handler:

```
import { eventHandler } from 'ddd-messaging-bus'

class MyEventHandler implements EventHandler {
    handle(domainEvent: UserCreated): Promise<void> {
        console.log("User Created In Memory");
        return Promise.resolve(undefined);
    }
}
```

(optional) Third:

```sh
karma test
```
## Tech

- [TypeScript](https://www.typescriptlang.org/) 
- [Inversify](https://inversify.io/) 
- [AmqpLib](https://www.npmjs.com/package/amqplib) 
- [Winston](https://www.npmjs.com/package//winston) 
- [Reflect Metadata](https://www.npmjs.com/package/reflect-metadata)
- 
#### Building for source

For production release:

```sh
gulp build --prod
```

Generating pre-built zip archives for distribution:

```sh
gulp build dist --prod
```

## Docker

Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

```sh
cd dillinger
docker build -t <youruser>/dillinger:${package.json.version} .
```

This will create the dillinger image and pull in the necessary dependencies.
Be sure to swap out `${package.json.version}` with the actual
version of Dillinger.

Once done, run the Docker image and map the port to whatever you wish on
your host. In this example, we simply map port 8000 of the host to
port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart=always --cap-add=SYS_ADMIN --name=dillinger <youruser>/dillinger:${package.json.version}
```

> Note: `--capt-add=SYS-ADMIN` is required for PDF rendering.

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:8000
```

## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
