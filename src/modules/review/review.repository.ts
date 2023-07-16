import { InjectRepository } from '@nestjs/typeorm';
import { IReviewRepository } from './review.IRepository';
import { Injectable } from '@nestjs/common';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewRepository implements IReviewRepository {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>
    ) {}

    async saveReview(userId: number, orderId: number, review: CreateReviewDto): Promise<Review> {
        const newReview = this.reviewRepository.create();
        newReview.orderId = orderId;
        newReview.userId = userId;
        newReview.title = review.title;
        newReview.content = review.content;

        const savedReview = await this.reviewRepository.save(newReview);
        return savedReview;
    }

    async findOneReview(reviewId: number): Promise<Review | null> {
        const review = await this.reviewRepository.findOne({ where: { id: reviewId } });
        return review || null;
    }
}
