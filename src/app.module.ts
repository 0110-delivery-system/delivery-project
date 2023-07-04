import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './modules/payment/payment.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { MenuModule } from './modules/menu/menu.module';
import { NotificationModule } from './modules/notification/notification.module';
import { OrderModule } from './modules/order/order.module';
import { OwnerModule } from './modules/owner/owner.module';
import { ReviewModule } from './modules/review/review.module';
import { StoreModule } from './modules/store/store.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        DatabaseModule,
        PaymentModule,
        AuthModule,
        BookmarkModule,
        DeliveryModule,
        MenuModule,
        NotificationModule,
        OrderModule,
        OwnerModule,
        ReviewModule,
        StoreModule,
        UserModule,
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: 3306,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [],
            synchronize: false,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
