import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Menu } from '../menu/entities/menu.entity';
import { OrderListDto } from './dto/create-order.dto';
import { IOrderRepository } from './order.IOrderRepository';

@Injectable()
export class OrderRepository implements IOrderRepository {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>
    ) {}

    async createOrder(userId: number, storeId: number, orderList: OrderListDto[]): Promise<Order> {
        const order = this.orderRepository.create();
        order.userId = userId;
        order.storeId = storeId;
        order.food = JSON.stringify(orderList);
        order.status = 'ACCEPTED_ORDER';
        order.Review = null;
        order.createdAt = new Date();
        order.paymentId = 'helloworld';
        await this.orderRepository.save(order);
        return;
    }

    async findMenuByMenuId(menuId: number, storeId: number): Promise<Menu | undefined> {
        const menu = await this.menuRepository.findOne({
            where: { storeId: storeId, id: menuId },
        });
        return menu ?? undefined;
    }

    async getOrderStatus(orderId: number): Promise<Order | undefined> {
        const order = await this.orderRepository.findOne({ where: { id: orderId } });
        return order;
    }

    async updateOrderStatus(orderId, status): Promise<void> {
        await this.orderRepository.update(orderId, { status: status });
    }

    async getOrderByUserId(userId: number): Promise<Order[]> {
        const orders = await this.orderRepository.find({ where: { userId: userId } });
        return orders;
    }

    async deleteOrder(orderId: number): Promise<void> {
        await this.orderRepository.delete(orderId);
    }

    async getOrderByOrderId(orderId: number): Promise<Order | undefined> {
        const order = await this.orderRepository.findOne({ where: { id: orderId } });
        return order ?? undefined;
    }
}
