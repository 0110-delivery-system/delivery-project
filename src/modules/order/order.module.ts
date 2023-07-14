import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from '../menu/entities/menu.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, Menu])],
    controllers: [OrderController],
    providers: [OrderService, OrderRepository],
    exports: [OrderRepository],
})
export class OrderModule {}
