import { IsEmail, IsString } from 'class-validator';

export class CreateOwnerDto {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    @IsString()
    name: string;
}
