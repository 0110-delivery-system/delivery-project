import { IsString } from 'class-validator';

export class CreatereviewDto {
    @IsString()
    title: string;
    @IsString()
    content: string;
}
