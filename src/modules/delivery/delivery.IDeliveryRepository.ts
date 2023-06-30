export interface IDeliveryRepository {
    findOneDeliveryStatus(deliveryId: number);
    saveDeliveryInfo(orderId: number, deliveryInfo: any);
    updateDeliveryStatus(deliveryId: number, status: string);
    findOneDeliveryInfo(deliveryId: number);
}

export const IDeliveryRepository = Symbol('IDeliveryRepository');
