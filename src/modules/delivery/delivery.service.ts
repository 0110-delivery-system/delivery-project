import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IDeliveryRepository } from './delivery.IDeliveryRepository';

@Injectable()
export class DeliveryService {
    constructor(@Inject(IDeliveryRepository) private deliveryRepository: IDeliveryRepository) {}

    async validatecreateDelivery(deliveryInfo: { deliveryAddress: string; receiver: string }) {
        if (!deliveryInfo.deliveryAddress) {
            throw new BadRequestException('배달 주소지가 없습니다.');
        }
        if (!deliveryInfo.receiver) {
            throw new BadRequestException('수령인이 없습니다.');
        }
        return true;
    }

    async createDelivery(orderId: number, deliveryInfo: any) {
        const validateResult = await this.validatecreateDelivery(deliveryInfo);
        if (validateResult) {
            const result = await this.deliveryRepository.createDelivery(orderId, deliveryInfo);
            return result;
        }
    }

    async validateStartDelivery(deliveryId: number) {
        const result = await this.deliveryRepository.findOneDeliveryStatus(deliveryId);
        if (result === 'START_DELIVERY') {
            throw new BadRequestException('이미 배달이 출발했습니다.');
        }
        if (result === 'COMPLETE_DELIVERY') {
            throw new BadRequestException('이미 배달이 완료되었습니다.');
        }
        return true;
    }

    async startDelivery(deliveryId: number) {
        const validateResult = await this.validateStartDelivery(deliveryId);
        if (validateResult) {
            const result = await this.deliveryRepository.updateDeliveryStatus(deliveryId, 'START_DELIVERY');
            return result;
        } else {
            return false;
        }
    }

    async validateCompleteDelivery(deliveryId: number) {
        const result = await this.deliveryRepository.findOneDeliveryStatus(deliveryId);
        if (result === 'WAIT_DELIVERY') {
            throw new BadRequestException('아직 배달이 출발하지 않았습니다.');
        }
        if (result === 'COMPLETE_DELIVERY') {
            throw new BadRequestException('이미 배달이 완료되었습니다.');
        }
        return true;
    }

    async completeDelivery(deliveryId: number) {
        const validateResult = await this.validateCompleteDelivery(deliveryId);
        if (validateResult) {
            const result = await this.deliveryRepository.updateDeliveryStatus(deliveryId, 'COMPLETE_DELIVERY');
            return result;
        } else {
            return false;
        }
    }

    async getDeliveryStatus(deliveryId: number) {
        const result = await this.deliveryRepository.findOneDeliveryStatus(deliveryId);
        return result ?? null;
    }

    async getDeliveryInfo(deliveryId: number) {
        const result = await this.deliveryRepository.findOneDeliveryInfo(deliveryId);
        return result ?? null;
    }
}
