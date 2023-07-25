import { ConfigModule as CM } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        CM.forRoot({
            isGlobal: true,
        }),
    ],
})
export class ConfigModule {}
