import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { DeliveryRepository } from './delivery.repository';
import { Delivery } from './entities/delivery.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from '../order/order.module';

@Module({
    imports: [TypeOrmModule.forFeature([Delivery]), OrderModule],
    controllers: [DeliveryController],
    providers: [DeliveryService, DeliveryRepository],
    exports: [DeliveryRepository],
})
export class DeliveryModule {}
