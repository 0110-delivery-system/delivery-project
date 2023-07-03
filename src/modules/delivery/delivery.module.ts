import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { IDeliveryRepository } from './delivery.IDeliveryRepository';
import { DeliveryRepository } from './delivery.repository';

@Module({
    controllers: [DeliveryController],
    providers: [DeliveryService, { provide: IDeliveryRepository, useClass: DeliveryRepository }],
})
export class DeliveryModule {}
