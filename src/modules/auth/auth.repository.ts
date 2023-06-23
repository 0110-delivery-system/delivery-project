import { Injectable } from '@nestjs/common';
import { IAuthRepository } from './auth.IRepository';

@Injectable()
export class AuthRepository implements IAuthRepository {
  findUserByEmail(email: any) {}
}
