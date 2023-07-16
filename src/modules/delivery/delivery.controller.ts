import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';

@Controller('delivery')
export class DeliveryController {
    constructor(private deliveryService: DeliveryService) {}

    @Post(':orderId')
    async createDelivery(@Param('orderId') orderId: number, @Body() deliveryInfo: CreateDeliveryDto) {
        const createdDelivery = await this.deliveryService.createDelivery(orderId, deliveryInfo);
        return createdDelivery;
    }

    @Get(':deliveryId/start')
    async startDelivery(@Param('deliveryId') deliveryId: number) {
        const startedDelivery = await this.deliveryService.startDelivery(deliveryId);
        return startedDelivery;
    }

    @Get(':deliveryId/complete')
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
