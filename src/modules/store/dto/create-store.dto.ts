import { IsNumber, IsString } from 'class-validator';

export class CreateStoreDto {
    @IsString()
    storeName: string;
    @IsString()
    address: string;
    @IsNumber()
    ownerId: number;
}
