import { Module } from '@nestjs/common';
import { reviewService } from './review.service';
import { reviewController } from './review.controller';

@Module({
  controllers: [reviewController],
  providers: [reviewService],
})
export class reviewModule {}
