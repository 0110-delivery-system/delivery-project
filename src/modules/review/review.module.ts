import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';
import { AuthModule } from '../auth/auth.module';
import { DeliveryModule } from '../delivery/delivery.module';

@Module({
    imports: [AuthModule, DeliveryModule],
    controllers: [ReviewController],
    providers: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
