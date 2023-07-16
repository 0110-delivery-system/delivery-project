import { OrderListDto } from './dto/create-order.dto';

export interface IOrderRepository {
    createOrder(userId: number, storeId: number, orderList: OrderListDto[]);
    findMenuByMenuId(menuId: number, storeId: number);

    getOrderStatus(orderId: number);

    updateOrderStatus(orderId, status);

    getOrderByUserId(userId: number);

    deleteOrder(orderId: number);

    getOrderByOrderId(orderId: number);
}

export const IOrderRepository = Symbol('IOrderRepository');
