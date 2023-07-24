import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Inject } from '@nestjs/common';
import { IUserRepository } from '../user/user.IRepository';
import { CreateAuthDto } from './dto/create-auth-dto';
import { IOwnerRepository } from '../owner/owner.IRepository';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @Inject(IUserRepository) private userRepository: IUserRepository,
        @Inject(IOwnerRepository) private ownerRepository: IOwnerRepository
    ) {}

    async signUp(body: CreateAuthDto) {
        const { email, password, name, isOwner } = body;
        const validateEmailResult = await this.validateEmail(email, isOwner);
        if (!validateEmailResult) {
            return validateEmailResult;
        }
        const validatePasswordResult = this.validatePassword(password);
        if (!validatePasswordResult) {
            return validatePasswordResult;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        if (isOwner) {
            await this.ownerRepository.createOwner(email, hashedPassword, name);
            return;
        } else {
            await this.userRepository.createUser(email, hashedPassword, name);
            return;
        }
    }

    async validateEmail(email: string, isOwner: boolean) {
        if (!email.includes('@')) {
            throw new BadRequestException('이메일 형식이 올바르지 않습니다');
        }
        if (isOwner) {
            const owner = await this.ownerRepository.findOneByEmail(email);
            if (owner) {
                throw new BadRequestException('이미 존재하는 이메일 입니다');
            }
        } else {
            const user = await this.userRepository.findUserByEmail(email);
            if (user) {
                throw new BadRequestException('이미 존재하는 이메일 입니다');
            }
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

    async login(body: { email: string; password: string }) {
        const { email, password } = body;
        const user = await this.userRepository.findUserByEmail(email);
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
            jwtSecretKey = process.env.JWT_ACCESS_SECRET;
            jwtExpireTime = process.env.JWT_ACCESS_TIME;

            const access_token = this.jwtService.sign({ userId }, { secret: jwtSecretKey, expiresIn: jwtExpireTime });
            return access_token;
        }

        if (type === 'refresh_token') {
            jwtSecretKey = process.env.JWT_REFRESH_SECRET;
            jwtExpireTime = process.env.JWT_REFRESH_TIME;

            const refresh_token = this.jwtService.sign({ userId }, { secret: jwtSecretKey, expiresIn: jwtExpireTime });
            return refresh_token;
        }
    }
}
