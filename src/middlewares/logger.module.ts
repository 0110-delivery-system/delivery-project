import { Module } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middeware';

@Module({
    imports: [],
    providers: [LoggerMiddleware],
    exports: [LoggerMiddleware],
})
export class LoggerModule {}
