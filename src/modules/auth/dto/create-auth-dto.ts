import { IsEmail, IsString } from 'class-validator';

export class CreateAuthDto {
    @IsEmail()
    email: string;
    password: string;
    @IsString()
    name: string;
}
