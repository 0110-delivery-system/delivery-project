import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { IUserRepository } from '../user/user.IRepository';
import { IOrderRepository } from '../order/order.IOrderRepository';
import { CreateReviewDto } from './dto/create-review.dto';
import { IDeliveryRepository } from '../delivery/delivery.IDeliveryRepository';

@Injectable()
export class ReviewService {
    constructor(
        @Inject(ReviewRepository) private reviewRepository: ReviewRepository,
        @Inject(IUserRepository) private userRepository: IUserRepository,
        @Inject(IOrderRepository) private orderRepository: IOrderRepository,
        @Inject(IDeliveryRepository) private deliveryRepository: IDeliveryRepository
    ) {}

    async createReview(userId: number, orderId: number, review: CreateReviewDto) {
        const result = this.validateReview(userId, orderId, review);
        if (result) {
            const createResult = this.reviewRepository.saveReview(userId, orderId, review);
            return createResult;
        }
    }

    async validateReview(userId: number, orderId: number, review: any) {
        const user = await this.userRepository.findUserById(userId);
        const order = await this.orderRepository.getOrderByOrderId(orderId);
        const delivery = await this.deliveryRepository.findOneDeliveryStatus(order.deliveryId);

        if (user === null) {
            throw new BadRequestException('존재하지 않는 유저입니다.');
        }
        if (order === null) {
            throw new BadRequestException('존재하지 않는 주문입니다.');
        }
        if (order.userId !== Number(userId)) {
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
        if (delivery !== 'COMPLETE_DELIVERY') {
            throw new BadRequestException('배달 완료 된 주문만 리뷰를 작성할 수 있습니다.');
        }

        const addHours = (date, hours) => {
            const newDate = new Date(date.getTime());
            newDate.setHours(date.getHours() + hours);
            return newDate;
        };

        const currentTime = new Date();
        const oneHourAfterDelivery = addHours(order.createdAt, 1);
        const twentyFourHoursAfterDelivery = addHours(order.createdAt, 24);
        if (oneHourAfterDelivery > currentTime) {
            throw new BadRequestException('배달 완료 후 1시간 이후에 리뷰를 작성할 수 있습니다.');
        }

        if (twentyFourHoursAfterDelivery < currentTime) {
            throw new BadRequestException('리뷰 작성 기간이 지났습니다.');
        }

        return true;
    }

    async getReview(reviewId: number) {
        const result = await this.reviewRepository.findOneReview(reviewId);
        return result ?? null;
    }
}
