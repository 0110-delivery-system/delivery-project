import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { DeliveryRepository } from './delivery.repository';

@Module({
    controllers: [DeliveryController],
    providers: [DeliveryService, DeliveryRepository],
    exports: [DeliveryRepository],
})
export class DeliveryModule {}
