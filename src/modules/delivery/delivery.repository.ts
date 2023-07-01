import { IDeliveryRepository } from './delivery.IDeliveryRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeliveryRepository implements IDeliveryRepository {
    findOneDeliveryStatus(deliveryId: number) {
        return;
    }
    saveDeliveryInfo(orderId: number, deliveryInfo: any) {
        return;
    }
    updateDeliveryStatus(deliveryId: number, status: string) {
        return;
    }
    findOneDeliveryInfo(deliveryId: number) {
        return;
    }
}
