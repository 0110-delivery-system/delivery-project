import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASS,
            database: process.env.DATABASE_DB,
            autoLoadEntities: true,
            // synchronize: true, // Table 변경 시에만 주석 제거
            // logging: <LoggerOptions>['query'], // RAW Query를 보고 싶을 때 사용
        }),
    ],
})
export class DatabaseModule {}
