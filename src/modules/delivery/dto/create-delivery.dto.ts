import { IsNumber, IsString } from 'class-validator';

export class CreateDeliveryDto {
    @IsNumber()
    userId: number;
    @IsString()
    deliveryAddress: string;
    @IsString()
    receiver: string;
}
