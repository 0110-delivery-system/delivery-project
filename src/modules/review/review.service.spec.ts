import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { BadRequestException } from '@nestjs/common';
import { IReviewRepository } from './review.IRepository';
import { jest } from '@jest/globals';

export class FakeAuthService {
    getUser(userId: number) {
        if (userId === 1) {
            return null;
        } else if (userId === 2) {
            return { id: 2, name: 'test' };
        } else if (userId === 3) {
            return { id: 3, name: 'test' };
        }
    }
}

const addMinutes = (date, minutes) => {
    const newDate = new Date(date.getTime());
    newDate.setMinutes(date.getMinutes() + minutes);
    return newDate;
};

const addHours = (date, hours) => {
    const newDate = new Date(date.getTime());
    newDate.setHours(date.getHours() + hours);
    return newDate;
};

const subtractDays = (date: Date, days: number) => {
    const newDate = new Date(date.getTime());
    newDate.setDate(date.getDate() - days);
    return newDate;
};

const subtractHours = (date: Date, hours: number) => {
    const newDate = new Date(date.getTime());
    newDate.setHours(date.getHours() - hours);
    return newDate;
};

const currentDate = new Date();
const oneHourAfter = subtractDays(currentDate, 1);
const oneHourBefore = subtractHours(currentDate, 1);
const twentyFourHoursAfter = subtractDays(currentDate, 1);
const fiveMinutesAfter = addMinutes(currentDate, 5);

export class FakeDeliveryService {
    getOrder(deliveryId: number) {
        if (deliveryId === 1) {
            return null;
        } else if (deliveryId === 2) {
            return { id: 2, userId: 2, name: 'test', status: '"COMPLETE_DELIVERY"', time: oneHourBefore };
        } else if (deliveryId === 3) {
            return { id: 3, userId: 3, name: 'test', review: { title: '맛있어요', content: '맛있어요' }, status: '"COMPLETE_DELIVERY"', time: oneHourAfter };
        } else if (deliveryId === 4) {
            return { id: 4, userId: 3, name: 'test', status: '"START_DELIVERY"', time: oneHourAfter };
        } else if (deliveryId === 5) {
            return { id: 5, userId: 2, name: 'test', status: '"COMPLETE_DELIVERY"', time: fiveMinutesAfter };
        } else if (deliveryId === 6) {
            return { id: 6, userId: 2, name: 'test', status: '"COMPLETE_DELIVERY"', time: twentyFourHoursAfter };
        }
    }
}

export class FakeReviewRepository implements IReviewRepository {
    saveReview(orderId: number, userId: number, review: any) {
        if (orderId === 2) {
            return true;
        } else {
            return false;
        }
    }
    findOneReview(userId: number, orderId: number) {
        if (orderId === 3) {
            return { title: '맛있어요', content: '맛있어요' };
        } else {
            return null;
        }
    }
}

describe('reviewService', () => {
    let reviewService: ReviewService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReviewService,
                { provide: FakeAuthService, useClass: FakeAuthService },
                { provide: FakeDeliveryService, useClass: FakeDeliveryService },
                {
                    provide: IReviewRepository,
                    useClass: FakeReviewRepository,
                },
            ],
        }).compile();

        reviewService = module.get<ReviewService>(ReviewService);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should be defined', () => {
        expect(reviewService).toBeDefined();
    });

    describe('createReview', () => {
        it('리뷰 작성 성공', async () => {
            const orderId = 2;
            const userId = 2;
            const review = {
                title: '맛있어요',
                content: '맛있어요',
            };
            expect(await reviewService.createReview(orderId, userId, review)).toBe(true);
        });
    });

    describe('validateReview', () => {
        it('존재하지 않는 유저일 때', async () => {
            const userId = 1;
            const orderId = 2;
            const review = {
                title: '맛있어요',
                content: '맛있어요',
            };
            await expect(reviewService.validateReview(userId, orderId, review)).rejects.toThrowError(new BadRequestException('존재하지 않는 유저입니다.'));
        });

        it('존재하지 않는 주문일 때', async () => {
            const userId = 2;
            const orderId = 1;
            const review = {
                title: '맛있어요',
                content: '맛있어요',
            };
            await expect(reviewService.validateReview(userId, orderId, review)).rejects.toThrowError(new BadRequestException('존재하지 않는 주문입니다.'));
        });

        it('이미 리뷰를 작성한 주문일 때 - 실패', async () => {
            const userId = 3;
            const orderId = 3;
            const review = {
                title: '맛있어요',
                content: '맛있어요',
            };
            await expect(reviewService.validateReview(userId, orderId, review)).rejects.toThrowError(new BadRequestException('이미 리뷰를 작성한 주문입니다.'));
        });

        it('해당 주문을 작성한 유저가 아닐 때 - 실패', async () => {
            const userId = 2;
            const orderId = 3;
            const review = {
                title: '맛있어요',
                content: '맛있어요',
            };
            await expect(reviewService.validateReview(userId, orderId, review)).rejects.toThrowError(new BadRequestException('해당 주문을 작성한 유저가 아닙니다.'));
        });

        it('리뷰 작성 가능한 주문일 때 - 성공', async () => {
            const userId = 2;
            const orderId = 2;
            const review = {
                title: '맛있어요',
                content: '맛있어요',
            };
            await expect(reviewService.validateReview(userId, orderId, review)).resolves.toBe(true);
        });

        it('리뷰의 제목이 없을 때 - 실패', async () => {
            const userId = 2;
            const orderId = 2;
            const review = {
                title: '',
                content: '맛있어요',
            };
            await expect(reviewService.validateReview(userId, orderId, review)).rejects.toThrowError(new BadRequestException('리뷰의 제목을 입력해주세요.'));
        });

        it('리뷰의 제목이 없을 때 - 실패', async () => {
            const userId = 2;
            const orderId = 2;
            const review = {
                title: null,
                content: '맛있어요',
            };
            await expect(reviewService.validateReview(userId, orderId, review)).rejects.toThrowError(new BadRequestException('리뷰의 제목을 입력해주세요.'));
        });

        it('리뷰의 내용이 없을 때 - 실패', async () => {
            const userId = 2;
            const orderId = 2;
            const review = {
                title: '맛있어요',
                content: '',
            };
            await expect(reviewService.validateReview(userId, orderId, review)).rejects.toThrowError(new BadRequestException('리뷰의 내용을 입력해주세요.'));
        });

        it('리뷰의 내용이 없을 때 - 실패', async () => {
            const userId = 2;
            const orderId = 2;
            const review = {
                title: '맛있어요',
                content: null,
            };
            await expect(reviewService.validateReview(userId, orderId, review)).rejects.toThrowError(new BadRequestException('리뷰의 내용을 입력해주세요.'));
        });

        it('스테이터스가 "COMPLETE_DELIVERY"가 아닐 때 - 실패', async () => {
            const userId = 3;
            const orderId = 4;
            const review = {
                title: '맛있어요',
                content: '맛있어요',
            };
            await expect(reviewService.validateReview(userId, orderId, review)).rejects.toThrowError(
                new BadRequestException('"COMPLETE_DELIVERY"된 주문만 리뷰를 작성할 수 있습니다.')
            );
        });

        it('"COMPLETE_DELIVERY" 후 1시간이 지나지 않았을 때 - 실패', async () => {
            const userId = 2;
            const orderId = 5;
            const review = {
                title: '맛있어요',
                content: '맛있어요',
            };

            const currentTime = new Date();
            const oneHourAfterDelivery = addHours(currentTime, 1);

            jest.setSystemTime(oneHourAfterDelivery);

            await expect(reviewService.validateReview(userId, orderId, review)).rejects.toThrowError(
                new BadRequestException('"COMPLETE_DELIVERY" 후 1시간 이후에 리뷰를 작성할 수 있습니다.')
            );
        });

        it('배달 완료 후 24시간이 지났을 때 - 실패', async () => {
            const userId = 2;
            const orderId = 6;
            const review = {
                title: '맛있어요',
                content: '맛있어요',
            };

            const currentTime = new Date();
            const twentyFourHoursAfterDelivery = addHours(currentTime, 24);

            jest.setSystemTime(twentyFourHoursAfterDelivery);

            await expect(reviewService.validateReview(userId, orderId, review)).rejects.toThrowError(new BadRequestException('리뷰 작성 기간이 지났습니다.'));
        });
    });

    describe('getReview', () => {
        it('리뷰 조회 성공', async () => {
            const userId = 3;
            const orderId = 3;
            await expect(reviewService.getReview(userId, orderId)).resolves.toEqual({
                title: '맛있어요',
                content: '맛있어요',
            });
        });
    });
});
