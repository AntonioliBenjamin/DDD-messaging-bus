const winston = require('winston');

export const logger = winston.createLogger({
    level: process.env.DEBUG_MESSAGE != null ? 'debug' : 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()),
    timestamp: true,
    defaultMeta: { service: 'DDD-messaging-bus' },
    transports: [
        new winston.transports.Console()
    ],
});

