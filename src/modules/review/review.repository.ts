import { InjectRepository } from '@nestjs/typeorm';
import { IReviewRepository } from './review.IRepository';
import { Injectable } from '@nestjs/common';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewRepository implements IReviewRepository {
    constructor(
        @InjectRepository(Review)
        private reviewModel: Repository<Review>
    ) {}

    async saveReview(orderId: number, userId: number, review: any): Promise<Review> {
        const newReview = this.reviewModel.create();
        newReview.OrderId = orderId;
        newReview.userId = userId;
        newReview.title = review.title;
        newReview.content = review.content;

        const savedReview = await this.reviewModel.save(newReview);
        return savedReview;
    }

    async findOneReview(userId: number, orderId: number): Promise<Review | null> {
        const review = await this.reviewModel.findOne({ where: { userId: userId, OrderId: orderId } });
        return review || null;
    }
}
