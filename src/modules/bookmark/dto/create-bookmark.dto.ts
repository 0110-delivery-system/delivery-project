import { IsNumber } from 'class-validator';

export class CreateBookmarkDto {
    @IsNumber()
    id: number;
    @IsNumber()
    userId: number;
    @IsNumber()
    storeId: number;
}
