import { IReviewRepository } from './review.IRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewRepository implements IReviewRepository {
    saveReview(orderId: number, userId: number, review: any) {
        return true;
    }
    findOneReview(userId: number, orderId: number) {
        return true;
    }
}
