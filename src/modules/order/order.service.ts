import { BadRequestException, Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { CreateOrderDto, OrderListDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { IOrderRepository } from './order.IOrderRepository';

@Injectable()
export class OrderService {
    constructor(@Inject(IOrderRepository) private orderRepository: IOrderRepository) {}

    async validateOrderInfo(order: OrderListDto[], storeId: number) {
        if (order.length > 10) {
            throw new BadRequestException('메뉴가 10개를 초과하였습니다');
        }
        for (const orderItem of order) {
            const menu = await this.orderRepository.findMenuByMenuId(orderItem.menuId, storeId);
            if (!menu) {
                throw new BadRequestException('존재하지 않는 메뉴입니다');
            }
        }
        return true;
    }

    async createOrder(storeId: number, body: CreateOrderDto) {
        const { userId, orderList } = body;
        const validationResult = await this.validateOrderInfo(orderList, storeId);
        if (!validationResult) {
            return validationResult;
        }
        await this.orderRepository.createOrder(userId, storeId, orderList);
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
        const confirmOrderList: Order[] = [];
        for (const order of orderList) {
            const result = this.checkAfterThreeMonth(nowDate, order.createdAt);
            if (result === true) {
                confirmOrderList.push(order);
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

    async updateOrderStatus(orderId: number, status: string) {
        const order = await this.orderRepository.getOrderByOrderId(Number(orderId));
        if (!order) {
            throw new BadRequestException('존재하지 않는 주문입니다');
        }
        if (order.status !== 'ACCEPTED_ORDER' && status === 'CONFIRMED_ORDER') {
            throw new BadRequestException('주문 접수 상태가 아닙니다');
        } else if (order.status === 'CONFIRMED_ORDER' && status === 'CANCEL_ORDER') {
            throw new BadRequestException('주문 확정 상태는 취소할 수 없습니다');
        } else {
            await this.orderRepository.updateOrderStatus(orderId, status);
        }
    }

    async checkIsOrder(orderId: number) {
        const order = await this.orderRepository.getOrderByOrderId(orderId);
        if (!order) {
            throw new BadRequestException('존재하지 않는 주문입니다');
        }
        return true;
    }
}
