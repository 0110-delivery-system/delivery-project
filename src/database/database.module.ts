import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3010,
            username: 'admin',
            password: '1234*A',
            database: 'test',
            autoLoadEntities: true,
            synchronize: true,
        }),
    ],
})
export class DatabaseModule {}
