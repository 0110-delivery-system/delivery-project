import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post(':storeId')
    async createOrder(@Param('storeId') storeId: number, @Body() body: CreateOrderDto) {
        return await this.orderService.createOrder(storeId, body);
    }

    @Delete(':orderId')
    async cancelOrder(@Param('orderId') orderId: number) {
        return await this.orderService.cancelOrder(orderId);
    }

    @Get(':userId/history')
    async getOrderHistory(@Param('userId') userId: number) {
        const nowDate = new Date();
        return await this.orderService.getManyOrderHistory(nowDate, userId);
    }
}
