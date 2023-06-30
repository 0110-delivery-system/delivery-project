import { IReviewRepository } from './review.IRepository';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { UpdatereviewDto } from './dto/update-review.dto';
import { FakeAuthService, FakeDeliveryService } from './review.service.spec';
@Injectable()
export class ReviewService {
    constructor(@Inject(IReviewRepository) private reviewRepository: IReviewRepository) {}
    authService = new FakeAuthService();
    orderService = new FakeDeliveryService();

    async createReview(orderId: number, userId: number, review: any) {
        const createResult = this.reviewRepository.saveReview(orderId, userId, review);
        return createResult;
    }

    async validateReview(userId: number, deliveryId: number, review: any) {
        const user = await this.authService.getUser(userId);
        const order = await this.orderService.getOrder(deliveryId);

        if (user === null) {
            throw new BadRequestException('존재하지 않는 유저입니다.');
        }
        if (order === null) {
            throw new BadRequestException('존재하지 않는 주문입니다.');
        }
        if (order.userId !== userId) {
            throw new BadRequestException('해당 주문을 작성한 유저가 아닙니다.');
        }
        if (order.review) {
            throw new BadRequestException('이미 리뷰를 작성한 주문입니다.');
        }
        if (!review.title) {
            throw new BadRequestException('리뷰의 제목을 입력해주세요.');
        }
        if (!review.content) {
            throw new BadRequestException('리뷰의 내용을 입력해주세요.');
        }
        if (order.status !== '"COMPLETE_DELIVERY"') {
            throw new BadRequestException('"COMPLETE_DELIVERY"된 주문만 리뷰를 작성할 수 있습니다.');
        }

        const addHours = (date, hours) => {
            const newDate = new Date(date.getTime());
            newDate.setHours(date.getHours() + hours);
            return newDate;
        };

        const currentTime = new Date();
        const oneHourAfterDelivery = addHours(order.time, 1);
        const twentyFourHoursAfterDelivery = addHours(order.time, 24);
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
