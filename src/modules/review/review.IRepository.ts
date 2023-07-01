export interface IReviewRepository {
    saveReview(orderId: number, userId: number, review: any);
    findOneReview(userId: number, orderId: number);
}

export const IReviewRepository = Symbol('IReviewRepository');
