import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';

export class CreateOrderDto {
    @IsNumber()
    userId: number;
    @Type(() => OrderListDto)
    @ValidateNested({ each: true })
    orderList: OrderListDto[];
}
export class OrderListDto {
    @IsNumber()
    quantity: number;
    @IsNumber()
    menuId: number;
}
