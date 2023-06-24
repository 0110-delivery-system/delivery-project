import { BadRequestException, Injectable } from "@nestjs/common";
import { FakeOrderRepository } from "./order.service.spec";

@Injectable()
export class OrderService {
    orderRepository = new FakeOrderRepository();

    async validateOrderInfo(menuList, storeId: number) {
        if (menuList.length > 10) {
            throw new BadRequestException("메뉴가 10개를 초과하였습니다");
        }

        for (let i = 0; i < menuList.length; i++) {
            const menu = await this.orderRepository.findMenuByMenuId(menuList[i].id, storeId);
            if (!menu) {
                throw new BadRequestException("존재하지 않는 메뉴입니다");
            }
        }
        return true;
    }

    async createOrder(storeId: number, menuList) {
        const validationResult = await this.validateOrderInfo(menuList, storeId);
        if (!validationResult) {
            return validationResult;
        }
        await this.orderRepository.createOrder(storeId, menuList);
        return;
    }

    async cancleOrder(orderId: number) {
        const order = await this.orderRepository.getOrderStatus(orderId);
        if (!order) {
            throw new BadRequestException("존재하지 않는 주문입니다");
        }

        const validationOrderStatus = this.checkOrderStatus_cancle(order.status);
        if (!validationOrderStatus) {
            return validationOrderStatus;
        }

        await this.orderRepository.deleteOrder(orderId);
        return;
    }

    checkOrderStatus_cancle(orderStatus: string) {
        if (orderStatus === "주문 확정") {
            throw new BadRequestException("주문 확정된 주문은 취소할 수 없습니다");
        }
        if (orderStatus === "배달 중") {
            throw new BadRequestException("배달 중인 주문은 취소할 수 없습니다");
        }
        if (orderStatus === "배달 완료") {
            throw new BadRequestException("배달이 완료된 주문은 취소할 수 없습니다");
        }
        return true;
    }
}
