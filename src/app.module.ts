import { LoggerMiddleware } from './middlewares/logger.middeware';
import { Module, NestModule } from '@nestjs/common';
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
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from './config/config.module';
import { MiddlewareConsumer } from '@nestjs/common';

@Module({
    imports: [
        ConfigModule,
        DatabaseModule,
        PaymentModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
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
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
