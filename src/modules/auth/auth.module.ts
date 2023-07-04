import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtService, AuthRepository],
    exports: [AuthRepository],
})
export class AuthModule {}
