import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from '../menu/entities/menu.entity';
import { IOrderRepository } from './order.IOrderRepository';

@Module({
    imports: [TypeOrmModule.forFeature([Order, Menu])],
    controllers: [OrderController],
    providers: [OrderService, { provide: IOrderRepository, useClass: OrderRepository }],
    exports: [IOrderRepository],
})
export class OrderModule {}
