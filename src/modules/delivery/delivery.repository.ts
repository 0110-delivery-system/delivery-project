import { IDeliveryRepository } from './delivery.IDeliveryRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeliveryRepository implements IDeliveryRepository {
    saveDeliveryInfo(orderId: number, deliveryInfo: any) {
        if (orderId === 1) {
            return {
                deliveryId: 1,
                status: 'WAIT_DELIVERY',
                receiver: '김철수',
                deliveryAddress: '서울시 강남구',
            };
        } else if (orderId === 2) {
            return {
                deliveryId: 2,
                status: 'START_DELIVERY',
                receiver: '김철수',
                deliveryAddress: '서울시 강남구',
            };
        }
    }
    updateDeliveryStatus(deliveryId: number, status: string) {
        if (deliveryId === 1) {
            return {
                status: 'START_DELIVERY',
                deliveryId: 1,
                receiver: '김철수',
                deliveryAddress: '서울시 강남구',
            };
        } else if (deliveryId === 2) {
            return true;
        }
    }
    findOneDeliveryStatus(deliveryId: number) {
        if (deliveryId === 1) {
            return { status: 'WAIT_DELIVERY' };
        } else if (deliveryId === 2) {
            return { status: 'START_DELIVERY' };
        } else if (deliveryId === 3) {
            return { status: 'COMPLETE_DELIVERY' };
        } else if (deliveryId === 4) {
            return null;
        }
    }
    findOneDeliveryInfo(deliveryId: number) {
        if (deliveryId === 1) {
            return {
                userId: 1,
                status: 'START_DELIVERY',
                deliveryId: 1,
                receiver: '김철수',
                deliveryAddress: '서울시 강남구',
                review: null,
                time: '2021-01-01',
            };
        } else if (deliveryId === 2) {
            return null;
        }
        return;
    }
}
