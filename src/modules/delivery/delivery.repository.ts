import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { IOrderRepository } from './../order/order.IOrderRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { IDeliveryRepository } from './delivery.IDeliveryRepository';
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Delivery } from './entities/delivery.entity';

@Injectable()
export class DeliveryRepository implements IDeliveryRepository {
    constructor(@InjectRepository(Delivery) private deliveryRepository: Repository<Delivery>, @Inject(IOrderRepository) private orderRepository: IOrderRepository) {}

    async createDelivery(orderId: number, deliveryInfo: CreateDeliveryDto) {
        const order = await this.orderRepository.getOrderByOrderId(orderId);
        if (!order) {
            throw new BadRequestException(`존재 하지 않는 주문입니다.`);
        }

        const { receiver, deliveryAddress, userId } = deliveryInfo;
        const delivery = this.deliveryRepository.create();
        delivery.userId = userId;
        delivery.status = 'WAIT_DELIVERY';
        delivery.orderId = orderId;
        delivery.receiver = receiver;
        delivery.address = deliveryAddress;
        const createdDelivery = await this.deliveryRepository.save(delivery);
        return createdDelivery;
    }

    async updateDeliveryStatus(deliveryId: number, status: string): Promise<Delivery | null> {
        const delivery = await this.deliveryRepository.findOne({ where: { id: deliveryId } });
        if (!delivery) {
            return null;
        }
        delivery.status = status;
        const updatedDelivery = await this.deliveryRepository.save(delivery);
        return updatedDelivery;
    }

    async findOneDeliveryStatus(deliveryId: number): Promise<string | null> {
        const delivery = await this.deliveryRepository.findOne({ where: { id: deliveryId } });
        if (!delivery) {
            return null;
        }
        return delivery.status;
    }

    async findOneDeliveryInfo(deliveryId: number): Promise<any | null> {
        const delivery = await this.deliveryRepository.findOne({ where: { id: deliveryId } });
        if (!delivery) {
            return null;
        }
        const deliveryInfo = {
            userId: delivery.userId,
            status: delivery.status,
            deliveryId: delivery.id,
            receiver: delivery.receiver,
            deliveryAddress: delivery.address,

            // time: delivery.createdAt.toISOString(),
        };

        return deliveryInfo;
    }
}
