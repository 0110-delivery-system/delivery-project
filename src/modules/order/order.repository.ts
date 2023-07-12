import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository {
    findMenuByMenuId(menuId: number, storeId: number) {
        if (storeId === 1 && menuId === 999) {
            return;
        }
        return { id: 1, foodName: '마라샹궈', price: 15000 };
    }

    createOrder(storeId: number, menuList) {
        const a = 0;
        return a;
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
