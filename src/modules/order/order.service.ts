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
}
