import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/passport/guard/jwt-auth.guard';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @UseGuards(JwtAuthGuard)
    @Post(':storeId')
    async createOrder(@Param('storeId') storeId: number, @Body() body: CreateOrderDto) {
        return await this.orderService.createOrder(storeId, body);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':userId/history')
    async getOrderHistory(@Param('userId') userId: number) {
        const nowDate = new Date();
        return await this.orderService.getManyOrderHistory(nowDate, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':orderId/confirm')
    async confirmOrder(@Param('orderId') orderId: number) {
        return await this.orderService.updateOrderStatus(orderId, 'CONFIRMED_ORDER');
    }

    @UseGuards(JwtAuthGuard)
    @Get(':orderId/cancel')
    async cancelOrder_byUser(@Param('orderId') orderId: number) {
        return await this.orderService.updateOrderStatus(orderId, 'CANCEL_ORDER');
    }
}
