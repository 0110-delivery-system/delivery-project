import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from './auth.IRepository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IAuthRepository) private authRepository: IAuthRepository,
  ) {}

  async signUp(email: string, password: string) {
    const validateEmailResult = await this.validateEmail(email);
    if (!validateEmailResult) {
      return validateEmailResult;
    }

    const validatePasswordResult = this.validatePassword(password);
    if (!validatePasswordResult) {
      return validatePasswordResult;
    }
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
}
