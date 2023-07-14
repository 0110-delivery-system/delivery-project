import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';

export class FakeOrderRepository {
    findMenuByMenuId(menuId: number, storeId: number) {
        if (storeId === 1 && menuId === 999) {
            return;
        }
        return { id: 1, foodName: '마라샹궈', price: 15000 };
    }

    createOrder(storeId: number, menuIds) {
        return;
    }

    getOrderStatus(orderId: number) {
        if (orderId === 1) {
            return { id: 1, UserId: 1, food: [{ id: 1, foodName: '마라샹궈', price: 15000 }], status: '주문 확정' };
        }
        if (orderId === 2) {
            return { id: 1, UserId: 1, food: [{ id: 1, foodName: '마라샹궈', price: 15000 }], status: '배달 중' };
        }
        if (orderId === 3) {
            return { id: 1, UserId: 1, food: [{ id: 1, foodName: '마라샹궈', price: 15000 }], status: '배달 완료' };
        }
        if (orderId === 4) {
            return { id: 1, UserId: 1, food: [{ id: 1, foodName: '마라샹궈', price: 15000 }], status: '주문 접수' };
        }
        if (orderId === 999) {
            return;
        }
    }

    getOrderByUserId(userId: number) {
        if (userId === 1) {
            return [
                { id: 1, UserId: 1, food: [{ id: 1, foodName: '마라샹궈', price: 15000 }], status: '주문 확정', createdAt: new Date('2023-01-02') },
                { id: 2, UserId: 1, food: [{ id: 1, foodName: '마라샹궈', price: 15000 }], status: '배달 중', createdAt: new Date('2023-04-02') },
            ];
        }
    }

    deleteOrder(orderId: number) {
        return;
    }

    getOrderByOrderId(orderId: number) {
        if (orderId === 1) {
            return { id: 1, UserId: 1, food: [{ id: 1, foodName: '마라샹궈', price: 15000 }], status: '배달 완료', review: '맛있다맛있어' };
        }
        if (orderId === 2) {
            return { id: 2, UserId: 1, food: [{ id: 1, foodName: '마라샹궈', price: 15000 }], status: '주문 접수', review: '' };
        }
        if (orderId === 3) {
            return { id: 3, UserId: 1, food: [{ id: 1, foodName: '마라샹궈', price: 15000 }], status: '배달 중', review: '' };
        }
        if (orderId === 4) {
            return { id: 4, UserId: 1, food: [{ id: 1, foodName: '마라샹궈', price: 15000 }], status: '주문 확정', review: '' };
        }
        if (orderId === 5) {
            return { id: 5, UserId: 1, food: [{ id: 1, foodName: '마라샹궈', price: 15000 }], status: '배달 완료', review: '' };
        }
    }
}

describe('OrderService', () => {
    let orderService: OrderService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OrderService, FakeOrderRepository],
        }).compile();

        orderService = module.get<OrderService>(OrderService);
    });

    it('should be defined', () => {
        expect(orderService).toBeDefined();
    });

    describe('validateOrderInfo()', () => {
        it('존재하지 않는 메뉴를 주문하였을 때 - 실패', async () => {
            const menuIds = [
                { id: 1, foodName: '마라샹궈' },
                { id: 999, foodName: '콩' },
            ];
            const storeId = 1;
            await expect(orderService.validateOrderInfo(menuIds, storeId)).rejects.toThrowError(new BadRequestException('존재하지 않는 메뉴입니다'));
        });

        it('메뉴를 10개 초과하여 주문하였을 때 - 실패', async () => {
            const storeId = 1;
            const menuIds = [
                { id: 1, foodName: '마라샹궈', price: 15000 },
                { id: 2, foodName: '콩', price: 100 },
                { id: 3, foodName: '콩자반', price: 100 },
                { id: 4, foodName: '콩국수', price: 100 },
                { id: 5, foodName: '콩마라샹궈', price: 100 },
                { id: 6, foodName: '콩밥', price: 100 },
                { id: 7, foodName: '콩마라탕', price: 100 },
                { id: 8, foodName: '콩냉면', price: 100 },
                { id: 9, foodName: '콩두부', price: 100 },
                { id: 10, foodName: '콩고기', price: 100 },
                { id: 11, foodName: '콩싫어...', price: 100 },
            ];
            await expect(orderService.validateOrderInfo(menuIds, storeId)).rejects.toThrowError(new BadRequestException('메뉴가 10개를 초과하였습니다'));
        });

        it('주문 검증을 통과한 경우 - 성공', async () => {
            const storeId = 1;
            const menuIds = [
                { id: 1, foodName: '마라샹궈', price: 15000 },
                { id: 2, foodName: '마라탕', price: 10000 },
            ];
            const result = await orderService.validateOrderInfo(menuIds, storeId);
            expect(result).toEqual(true);
        });
    });

    describe('createOrder()', () => {
        it('주문 검증에 실패한 경우 - 실패', async () => {
            const storeId = 1;
            const menuIds = [
                { id: 1, foodName: '마라샹궈', price: 15000 },
                { id: 999, foodName: '콩', price: 100 },
            ];
            await expect(orderService.createOrder(storeId, menuIds)).rejects.toThrowError(new BadRequestException('존재하지 않는 메뉴입니다'));
        });

        it('주문 검증에 성공한 경우 - 성공', async () => {
            const storeId = 1;
            const menuIds = [
                { id: 1, foodName: '마라샹궈', price: 15000 },
                { id: 2, foodName: '마라탕', price: 10000 },
            ];
            const result = await orderService.createOrder(storeId, menuIds);
            expect(result).toEqual(undefined);
        });
    });

    describe('checkOrderStatus_cancel', () => {
        it('주문 상태가 주문 확정일 경우 - 실패', () => {
            const orderStatus = '주문 확정';
            expect(() => {
                orderService.checkOrderStatus_cancel(orderStatus);
            }).toThrowError('주문 확정된 주문은 취소할 수 없습니다');
        });

        it('배달중인 주문은 취소할 수 없습니다 - 실패', () => {
            const orderStatus = '배달 중';
            expect(() => {
                orderService.checkOrderStatus_cancel(orderStatus);
            }).toThrowError('배달 중인 주문은 취소할 수 없습니다');
        });

        it('배달이 완료된 주문은 취소할 수 없습니다 - 실패', () => {
            const orderStatus = '배달 완료';
            expect(() => {
                orderService.checkOrderStatus_cancel(orderStatus);
            }).toThrowError('배달이 완료된 주문은 취소할 수 없습니다');
        });

        it('validation에 성공했을 경우', () => {
            const orderStatus = '주문 접수';
            const result = orderService.checkOrderStatus_cancel(orderStatus);
            expect(result).toEqual(true);
        });
    });

    describe('cancelOrder()', () => {
        it('주문 상태가 주문 접수 상태가 아닐 때 - 실패', async () => {
            const orderId_receive = 1;
            const orderId_on_delivery = 2;
            const orderId3_complete = 3;
            await expect(orderService.cancelOrder(orderId_receive)).rejects.toThrowError('주문 확정된 주문은 취소할 수 없습니다');
            await expect(orderService.cancelOrder(orderId_on_delivery)).rejects.toThrowError('배달 중인 주문은 취소할 수 없습니다');
            await expect(orderService.cancelOrder(orderId3_complete)).rejects.toThrowError('배달이 완료된 주문은 취소할 수 없습니다');
        });

        it('존재하지 않는 주문일 경우', async () => {
            const orderId = 999;
            await expect(orderService.cancelOrder(orderId)).rejects.toThrowError('존재하지 않는 주문입니다');
        });

        it('주문이 정상적으로 취소되었을 경우 - 성공', async () => {
            const orderId = 4;
            const result = await orderService.cancelOrder(orderId);
            expect(result).toBeNull;
        });
    });

    describe('checkAfterThreeMonth', () => {
        it('3개월이 지났을 경우 - 실패', () => {
            const nowDate = new Date('2023-10-01');
            const createdAt1 = new Date('2023-05-02');
            const createdAt2 = new Date('2023-04-05');
            const createdAt3 = new Date('2023-05-01');

            const result = orderService.checkAfterThreeMonth(nowDate, createdAt1);
            const result2 = orderService.checkAfterThreeMonth(nowDate, createdAt2);
            const result3 = orderService.checkAfterThreeMonth(nowDate, createdAt3);

            expect(result).toEqual(false);
            expect(result2).toEqual(false);
            expect(result3).toEqual(false);
        });

        it('3개월이 지나지 않았을 경우 - 성공', () => {
            const nowDate = new Date('2023-01-01');
            const createdAt1 = new Date('2023-01-02');
            const createdAt2 = new Date('2023-02-02');
            const createdAt3 = new Date('2023-03-31');

            const result = orderService.checkAfterThreeMonth(nowDate, createdAt1);
            const result2 = orderService.checkAfterThreeMonth(nowDate, createdAt2);
            const result3 = orderService.checkAfterThreeMonth(nowDate, createdAt3);

            expect(result).toEqual(true);
            expect(result2).toEqual(true);
            expect(result3).toEqual(true);
        });
    });

    describe('getManyOrderHistory()', () => {
        it('3개월이 지나지 않은 주문정보만 가져오는지 - 성공', async () => {
            const nowDate = new Date('2023-05-01');
            const userId = 1;
            const result = await orderService.getManyOrderHistory(nowDate, userId);
            expect(result).toEqual([{ id: 2, UserId: 1, food: [{ id: 1, foodName: '마라샹궈', price: 15000 }], status: '배달 중', createdAt: new Date('2023-04-02') }]);
        });
    });

    describe('createNowDate()', () => {
        it('성공적으로 현재 날짜가 생성되었을 경우 - 성공', async () => {
            const nowDate = new Date();
            const result = await orderService.createNowDate();
            expect(result).toEqual(nowDate);
        });
    });

    describe('checkReviewAvailability', () => {
        it('하나의 주문에 두 개 이상의 리뷰를 작성할 경우 - 실패', async () => {
            const orderId = 1;
            await expect(orderService.checkReviewAvailability(orderId)).rejects.toThrowError(new BadRequestException('이미 리뷰를 작성한 주문입니다'));
        });

        it('주문 접수 상태일 경우 - 실패', async () => {
            const orderId = 2;
            await expect(orderService.checkReviewAvailability(orderId)).rejects.toThrowError('배달이 완료된 주문이 아닙니다');
        });

        it('배달 중인 경우 - 실패', async () => {
            const orderId = 3;
            await expect(orderService.checkReviewAvailability(orderId)).rejects.toThrowError('배달이 완료된 주문이 아닙니다');
        });

        it('주문 확정 상태일 경우 - 실패', async () => {
            const orderId = 4;
            await expect(orderService.checkReviewAvailability(orderId)).rejects.toThrowError('배달이 완료된 주문이 아닙니다');
        });

        it('성공적으로 체크했을 경우 - 성공', async () => {
            const orderId = 5;
            const result = await orderService.checkReviewAvailability(orderId);
            expect(result).toEqual(true);
        });
    });

    describe('confirmOrder()', () => {
        it('주문 확정 상태일 경우 - 실패', async () => {
            const orderId = 4;
            await expect(orderService.confirmOrder(orderId)).rejects.toThrowError(new BadRequestException('주문 접수 상태가 아닙니다'));
        });

        it('배달 중인 경우 - 실패', async () => {
            const orderId = 3;
            await expect(orderService.confirmOrder(orderId)).rejects.toThrowError(new BadRequestException('주문 접수 상태가 아닙니다'));
        });

        it('배달이 완료된 경우 - 실패', async () => {
            const orderId = 5;
            await expect(orderService.confirmOrder(orderId)).rejects.toThrowError(new BadRequestException('주문 접수 상태가 아닙니다'));
        });

        it('성공적으로 확정이 된 경우 - 성공', async () => {
            const orderId = 2;
            const result = await orderService.confirmOrder(orderId);
            expect(result).toEqual(true);
        });
    });

    describe('checkIsOrder()', () => {
        it('존재하지 않는 주문일 경우 - 실패', async () => {
            const orderId = 999;
            await expect(orderService.checkIsOrder(orderId)).rejects.toThrowError(new BadRequestException('존재하지 않는 주문입니다'));
        });

        it('존재하는 주문일 경우 - 성공', async () => {
            const orderId = 1;
            const result = await orderService.checkIsOrder(orderId);
            expect(result).toEqual(true);
        });
    });
});
