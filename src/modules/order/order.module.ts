import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { FakeOrderRepository } from "./order.service.spec";

@Module({
    controllers: [OrderController],
    providers: [OrderService, FakeOrderRepository],
})
export class OrderModule {}
