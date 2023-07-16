export interface IDeliveryRepository {
    findOneDeliveryStatus(deliveryId: number);
    createDelivery(orderId: number, deliveryInfo: any);
    updateDeliveryStatus(deliveryId: number, status: string);
    findOneDeliveryInfo(deliveryId: number);
}

export const IDeliveryRepository = Symbol('IDeliveryRepository');
