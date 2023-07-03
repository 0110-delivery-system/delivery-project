import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { IReviewRepository } from './review.IRepository';
import { ReviewRepository } from './review.repository';

@Module({
    controllers: [ReviewController],
    providers: [ReviewService, { provide: IReviewRepository, useClass: ReviewRepository }],
})
export class reviewModule {}
