import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { IDeliveryRepository } from './delivery.IDeliveryRepository';

@Injectable()
export class DeliveryService {
    constructor(@Inject(IDeliveryRepository) private deliveryRepository: IDeliveryRepository) {}

    async validateCreteDelivery(orderId: number, createDeliveryDto: any) {
        if (!createDeliveryDto.deliveryAddress) {
            throw new BadRequestException('배달 주소지가 없습니다.');
        }
        if (!createDeliveryDto.receiver) {
            throw new BadRequestException('수령인이 없습니다.');
        }
        return true;
    }

    async createDelivery(orderId: number, createDeliveryDto: any) {
        const validateResult = await this.validateCreteDelivery(orderId, createDeliveryDto);
        if (validateResult) {
            const result = await this.deliveryRepository.saveDeliveryInfo(orderId, createDeliveryDto);
            return result;
        }
    }

    async validateStartDelivery(deliveryId: number) {
        const result = await this.deliveryRepository.findOneDeliveryStatus(deliveryId);
        if (result.status === 'WAIT_DELIVERY') {
            return true;
        }
        if (result.status === 'START_DELIVERY') {
            throw new BadRequestException('이미 배달이 출발했습니다.');
        }
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
        if (result.status === 'START_DELIVERY') {
            return true;
        }
        if (result.status === 'COMPLETE_DELIVERY') {
            throw new BadRequestException('이미 배달이 완료되었습니다.');
        }
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
