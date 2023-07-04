import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Controller('deliveries')
export class DeliveryController {
    constructor(private readonly deliveryService: DeliveryService) {}

    @Post(':orderId')
    async createDelivery(@Param('orderId') orderId: number, @Body() deliveryInfo: any) {
        const createdDelivery = await this.deliveryService.createDelivery(orderId, deliveryInfo);
        return createdDelivery;
    }

    @Post(':deliveryId/start')
    async startDelivery(@Param('deliveryId') deliveryId: number) {
        const startedDelivery = await this.deliveryService.startDelivery(deliveryId);
        return startedDelivery;
    }

    @Post(':deliveryId/complete')
    async completeDelivery(@Param('deliveryId') deliveryId: number) {
        const completedDelivery = await this.deliveryService.completeDelivery(deliveryId);
        return completedDelivery;
    }

    @Get(':deliveryId/status')
    async getDeliveryStatus(@Param('deliveryId') deliveryId: number) {
        const deliveryStatus = await this.deliveryService.getDeliveryStatus(deliveryId);
        return deliveryStatus;
    }

    @Get(':deliveryId/info')
    async getDeliveryInfo(@Param('deliveryId') deliveryId: number) {
        const deliveryInfo = await this.deliveryService.getDeliveryInfo(deliveryId);
        return deliveryInfo;
    }
}
