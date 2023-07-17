import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passport/strategy/jwt.strategy';
import { RefreshStrategy } from './passport/strategy/refresh.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async () => ({
                secret: process.env.JWT_ACCESS_SECRET,
                signOptions: { expiresIn: process.env.JWT_ACCESS_TIME },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, RefreshStrategy],
    exports: [AuthService],
})
export class AuthModule {}
