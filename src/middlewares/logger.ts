import winston from 'winston';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import WinstonCloudwatch from 'winston-cloudwatch';

const { createLogger, format, transports } = winston;
const { combine, timestamp, colorize, printf, simple } = winston.format;

const logFormat = printf((info) => {
    return `${info.timestamp} [${info.level}] : ${info.message}`;
});

export default class Logger {
    private logger: winston.Logger;

    constructor() {
        this.logger = createLogger({
            level: 'info',
            format: combine(
                timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                logFormat
            ),
        });
        if (process.env.NODE_ENV === 'production') {
            const cloudwatchConfig = {
                logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
                logStreamName: `${process.env.CLOUDWATCH_GROUP_NAME}-${process.env.NODE_ENV}`,
                awsAccessKeyId: process.env.CLOUDWATCH_ACCESS_KEY,
                awsSecretKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY,
                awsRegion: process.env.CLOUDWATCH_REGION,
                messageFormatter: ({ level, message, additionalInfo }) => `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(additionalInfo)}}`,
            };
            const cloudWatchHelper = new WinstonCloudwatch(cloudwatchConfig);
            this.logger.add(cloudWatchHelper);
        } else if (process.env.NODE_ENV === 'debug') {
            this.logger.add(
                new transports.Console({
                    format: combine(colorize(), simple()),
                })
            );
        }
    }

    public info(msg: string) {
        this.logger.info(msg);
    }
    public error(errMsg: string) {
        this.logger.error(errMsg);
    }

    public getRequestLogger() {
        return WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({
                    level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
                    format: combine(colorize(), timestamp(), nestWinstonModuleUtilities.format.nestLike('SampleApp', { prettyPrint: true })),
                }),
            ],
        });
    }
}
