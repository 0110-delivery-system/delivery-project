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
        return;
    }
}
