import * as amqp from 'amqplib';

export class RabbitMqConfig {
    static async init(url: string, queueName: string) : Promise<amqp.Channel> {
        const connection = await amqp.connect(url);
        const channel = await connection.createChannel();
    
        channel.assertQueue(queueName);
       
        return channel
    }
  }
  