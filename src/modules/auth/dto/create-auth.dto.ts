import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateAuthDto {
    @ApiProperty({ type: String, description: 'email', example: 'blaze_96@naver.com' })
    @IsEmail()
    email: string;
    @IsString()
    password: string;
}
