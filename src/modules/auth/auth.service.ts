import { Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from './auth.IRepository';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IAuthRepository) private authRepository: AuthRepository,
  ) {}
}
