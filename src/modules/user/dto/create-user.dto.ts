import { IsEmail, IsString } from 'class-validator';
export class CreateUserDto {
    @IsEmail()
    email: string;
    password: string;
    @IsString()
    name: string;
    isOwner: boolean;
}
