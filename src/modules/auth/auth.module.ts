import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { IAuthRepository } from "./auth.IRepository";
import { AuthRepository } from "./auth.repository";

@Module({
    controllers: [AuthController],
    providers: [AuthService, { provide: IAuthRepository, useClass: AuthRepository }],
})
export class AuthModule {}
