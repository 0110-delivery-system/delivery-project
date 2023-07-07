import { InjectRepository } from '@nestjs/typeorm';
import { IDeliveryRepository } from './delivery.IDeliveryRepository';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from '../order/entities/order.entity';
import { Delivery } from './entities/delivery.entity';

@Injectable()
export class DeliveryRepository implements IDeliveryRepository {
    constructor(@InjectRepository(Delivery) private deliveryModel: Repository<Delivery>, @InjectRepository(Order) private orderModel: Repository<Order>) {}

    async createDelivery(orderId: number, deliveryInfo: any) {
        const order = await this.orderModel.findOne({ where: { id: orderId } });
        if (!order) {
            throw new BadRequestException(`Order with ID ${orderId} not found`);
        }

        const { status, receiver, deliveryAddress } = deliveryInfo;

        const delivery = this.deliveryModel.create();
        delivery.Order = order;
        delivery.status = status;
        delivery.receiver = receiver;
        delivery.address = deliveryAddress;

        const createdDelivery = await this.deliveryModel.save(delivery);
        return createdDelivery;
    }

    async updateDeliveryStatus(deliveryId: number, status: string): Promise<Delivery | null> {
        const delivery = await this.deliveryModel.findOne({ where: { id: deliveryId } });
        if (!delivery) {
            return null;
        }
        delivery.status = status;
        const updatedDelivery = await this.deliveryModel.save(delivery);
        return updatedDelivery;
    }

    async findOneDeliveryStatus(deliveryId: number): Promise<string | null> {
        const delivery = await this.deliveryModel.findOne({ where: { id: deliveryId } });
        if (!delivery) {
            return null;
        }
        return delivery.status;
    }

    async findOneDeliveryInfo(deliveryId: number): Promise<any | null> {
        const delivery = await this.deliveryModel.findOne({ where: { id: deliveryId } });
        if (!delivery) {
            return null;
        }
        const deliveryInfo = {
            userId: delivery.UserId,
            status: delivery.status,
            deliveryId: delivery.id,
            receiver: delivery.receiver,
            deliveryAddress: delivery.address,
            review: delivery.Review,
            // time: delivery.createdAt.toISOString(),
        };

        return deliveryInfo;
    }
}
