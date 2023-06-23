import { BadGatewayException, BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IAuthRepository } from './auth.IRepository';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

export class FakeAuthRepository implements IAuthRepository {
  findUserByEmail(email: any) {
    if (email === 'test@email.com') return { id: 1, email: 'teset@email.com' };
  }
}

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: IAuthRepository, useClass: FakeAuthRepository },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateEmail() - 이메일 검증', () => {
    it('이메일에 @가 들어가지 않을 경우', async () => {
      const email = 'testemail.com';
      await expect(authService.validateEmail(email)).rejects.toThrowError(
        new BadRequestException('이메일 형식이 올바르지 않습니다'),
      );
    });

    it('이미 존재하는 이메일일 경우', async () => {
      const email = 'test@email.com';
      await expect(authService.validateEmail(email)).rejects.toThrowError(
        new BadRequestException('이미 존재하는 이메일 입니다'),
      );
    });

    it('이메일에 @가 포함되고 존재하지 않는 이메일일 경우 - 성공', async () => {
      const email = 'alstjq@email.com';
      const result = await authService.validateEmail(email);
      expect(result).toEqual(true);
    });
  });
});
