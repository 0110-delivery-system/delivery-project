import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private authRepository: AuthRepository) {}

    async signUp(email: string, password: string) {
        const validateEmailResult = await this.validateEmail(email);
        if (!validateEmailResult) {
            return validateEmailResult;
        }
        const validatePasswordResult = this.validatePassword(password);
        if (!validatePasswordResult) {
            return validatePasswordResult;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.authRepository.createUser(email, hashedPassword);
        return;
    }

    async validateEmail(email: string) {
        if (!email.includes('@')) {
            throw new BadRequestException('이메일 형식이 올바르지 않습니다');
        }

        const user = await this.authRepository.findUserByEmail(email);
        if (user) {
            throw new BadRequestException('이미 존재하는 이메일 입니다');
        }
        return true;
    }

    validatePassword(password: string) {
        if (password.length < 4) {
            throw new BadRequestException('비밀번호가 형식에 맞지 않습니다');
        }
        if (password.length > 12) {
            throw new BadRequestException('비밀번호가 형식에 맞지 않습니다');
        }
        return true;
    }

    async login(email: string, password: string) {
        const user = await this.authRepository.findUserByEmail(email);
        if (!user) {
            throw new BadRequestException('계정 정보가 올바르지 않습니다');
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            throw new BadRequestException('계정 정보가 올바르지 않습니다');
        }

        const access_token = this.jwtGenerate(user.id, 'access_token');
        const refresh_token = this.jwtGenerate(user.id, 'refresh_token');
        return { access_token, refresh_token };
    }

    jwtGenerate(userId: number, type: string) {
        let jwtExpireTime: string;
        let jwtSecretKey: string;

        if (type === 'access_token') {
            jwtSecretKey = 'access_key';
            jwtExpireTime = '3600s';

            const access_token = this.jwtService.sign({ userId }, { secret: jwtSecretKey, expiresIn: jwtExpireTime });
            return access_token;
        }

        if (type === 'refresh_token') {
            jwtSecretKey = 'refresh_key';
            jwtExpireTime = '10000s';

            const refresh_token = this.jwtService.sign({ userId }, { secret: jwtSecretKey, expiresIn: jwtExpireTime });
            return refresh_token;
        }
    }
}
