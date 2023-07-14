import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Inject } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
    constructor(@Inject(OrderRepository) private orderRepository: OrderRepository) {}

    async validateOrderInfo(menuList, storeId: number) {
        if (menuList.length > 10) {
            throw new BadRequestException('메뉴가 10개를 초과하였습니다');
        }
        for (let i = 0; i < menuList.length; i++) {
            const menu = await this.orderRepository.findMenuByMenuId(menuList[i], storeId);
            console.log(menu);
            if (!menu) {
                throw new BadRequestException('존재하지 않는 메뉴입니다');
            }
        }
        return true;
    }

    async createOrder(storeId: number, body: CreateOrderDto) {
        const { menuIds, userId } = body;
        const validationResult = await this.validateOrderInfo(menuIds, storeId);
        if (!validationResult) {
            return validationResult;
        }

        for (let i = 0; i < menuIds.length; i++) {
            const menu = await this.orderRepository.findMenuByMenuId(menuIds[i], storeId);
            await this.orderRepository.createOrder(userId, menu);
        }
        return;
    }

    async cancelOrder(orderId: number) {
        const order = await this.orderRepository.getOrderStatus(orderId);
        if (!order) {
            throw new BadRequestException('존재하지 않는 주문입니다');
        }

        const validationOrderStatus = this.checkOrderStatus_cancel(order.status);
        if (!validationOrderStatus) {
            return validationOrderStatus;
        }

        await this.orderRepository.deleteOrder(orderId);
        return;
    }

    checkOrderStatus_cancel(orderStatus: string) {
        switch (orderStatus) {
            case 'CONFIRMED_ORDER':
                throw new BadRequestException('주문 확정된 주문은 취소할 수 없습니다');
            case 'DELIVERY_START':
                throw new BadRequestException('배달 중인 주문은 취소할 수 없습니다');
            case 'COMPLETED_DELIVERY':
                throw new BadRequestException('배달이 완료된 주문은 취소할 수 없습니다');
            default:
                return true;
        }
    }

    createNowDate() {
        return new Date();
    }

    async getManyOrderHistory(nowDate: Date, userId: number) {
        const orderList = await this.orderRepository.getOrderByUserId(userId);

        let confirmOrderList;
        for (let i = 0; i < orderList.length; i++) {
            const result = this.checkAfterThreeMonth(nowDate, orderList[i].createdAt);
            if (result === true) {
                confirmOrderList.push(orderList[i]);
            }
        }
        return confirmOrderList;
    }

    checkAfterThreeMonth(nowDate: Date, orderDate: Date) {
        const copyNowDate = new Date(nowDate);
        copyNowDate.setMonth(copyNowDate.getMonth() - 3);

        if (orderDate <= copyNowDate) {
            return false;
        } else if (orderDate >= copyNowDate) {
            return true;
        }
    }

    async checkReviewAvailability(orderId: number) {
        const order = await this.orderRepository.getOrderByOrderId(orderId);
        if (order.Review) {
            throw new BadRequestException('이미 리뷰를 작성한 주문입니다');
        }
        if (order.status !== '배달 완료') {
            throw new BadRequestException('배달이 완료된 주문이 아닙니다');
        }
        return true;
    }

    async confirmOrder(orderId: number) {
        const order = await this.orderRepository.getOrderByOrderId(orderId);
        if (order.status !== '주문 접수') {
            throw new BadRequestException('주문 접수 상태가 아닙니다');
        }
        return true;
    }

    async checkIsOrder(orderId: number) {
        const order = await this.orderRepository.getOrderByOrderId(orderId);
        if (!order) {
            throw new BadRequestException('존재하지 않는 주문입니다');
        }
        return true;
    }
}
