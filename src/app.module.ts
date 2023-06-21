import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './modules/payment/payment.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { MenuModule } from './modules/menu/menu.module';
import { NotificationModule } from './modules/notification/noti.module';
import { OrderModule } from './modules/order/order.module';
import { OwnerModule } from './modules/owner/owner.module';
import { reviewModule } from './modules/review/review.module';
import { StoreModule } from './modules/store/store.module';

@Module({
  imports: [
    PaymentModule,
    AuthModule,
    BookmarkModule,
    DeliveryModule,
    MenuModule,
    NotificationModule,
    OrderModule,
    OwnerModule,
    reviewModule,
    StoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
