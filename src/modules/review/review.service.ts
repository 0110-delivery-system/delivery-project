import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { IReviewRepository } from './review.IRepository';
import { IDeliveryRepository } from '../delivery/delivery.IDeliveryRepository';
import { IUserRepository } from '../user/user.IRepository';

@Injectable()
export class ReviewService {
    constructor(
        @Inject(IReviewRepository) private reviewRepository: IReviewRepository,
        @Inject(IUserRepository) private userRepository: IUserRepository,
        @Inject(IDeliveryRepository) private deliveryRepository: IDeliveryRepository
    ) {}

    async createReview(orderId: number, userId: number, review: any) {
        const createResult = this.reviewRepository.saveReview(orderId, userId, review);
        return createResult;
    }

    async validateReview(userId: number, deliveryId: number, review: any) {
        const user = await this.userRepository.findUserById(userId);
        const delivery = await this.deliveryRepository.findOneDeliveryInfo(deliveryId);

        if (user === null) {
            throw new BadRequestException('존재하지 않는 유저입니다.');
        }
        if (delivery === null) {
            throw new BadRequestException('존재하지 않는 주문입니다.');
        }
        if (delivery.userId !== userId) {
            throw new BadRequestException('해당 주문을 작성한 유저가 아닙니다.');
        }
        if (delivery.review) {
            throw new BadRequestException('이미 리뷰를 작성한 주문입니다.');
        }
        if (!review.title) {
            throw new BadRequestException('리뷰의 제목을 입력해주세요.');
        }
        if (!review.content) {
            throw new BadRequestException('리뷰의 내용을 입력해주세요.');
        }
        if (delivery.status !== '"COMPLETE_DELIVERY"') {
            throw new BadRequestException('"COMPLETE_DELIVERY"된 주문만 리뷰를 작성할 수 있습니다.');
        }

        const addHours = (date, hours) => {
            const newDate = new Date(date.getTime());
            newDate.setHours(date.getHours() + hours);
            return newDate;
        };

        const currentTime = new Date();
        const oneHourAfterDelivery = addHours(delivery.time, 1);
        const twentyFourHoursAfterDelivery = addHours(delivery.time, 24);
        if (oneHourAfterDelivery > currentTime) {
            throw new BadRequestException('"COMPLETE_DELIVERY" 후 1시간 이후에 리뷰를 작성할 수 있습니다.');
        }

        if (twentyFourHoursAfterDelivery < currentTime) {
            throw new BadRequestException('리뷰 작성 기간이 지났습니다.');
        }

        return true;
    }

    async getReview(userId: number, orderId: number) {
        const result = await this.reviewRepository.findOneReview(orderId, userId);
        return result ?? null;
    }
}
