import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Menu } from '../menu/entities/menu.entity';

@Injectable()
export class OrderRepository {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>
    ) {}

    async createOrder(userId: number, menu: Menu): Promise<Order> {
        const order = this.orderRepository.create();
        order.userId = userId;
        order.storeId = menu.storeId;
        order.food = JSON.stringify(menu);
        order.status = 'ACCEPT_ORDER';
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

    async getOrderByUserId(userId: number): Promise<Order[]> {
        const orders = await this.orderRepository.find({ where: { userId: userId } });
        return orders;
    }

    async deleteOrder(orderId: number): Promise<void> {
        await this.orderRepository.delete(orderId);
    }

    async getOrderByOrderId(orderId: number): Promise<Order | undefined> {
        const order = await this.orderRepository.findOne({ where: { id: orderId } });
        return order;
    }
}
