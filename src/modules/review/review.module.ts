import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { UserModule } from '../user/user.module';
import { OrderModule } from '../order/order.module';
import { DeliveryModule } from '../delivery/delivery.module';

@Module({
    imports: [UserModule, AuthModule, OrderModule, DeliveryModule, TypeOrmModule.forFeature([Review])],
    controllers: [ReviewController],
    providers: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
