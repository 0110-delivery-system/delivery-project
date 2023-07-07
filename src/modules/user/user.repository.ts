import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user.IRepository';

@Injectable()
export class UserRepository implements IUserRepository {
    findUserById(userId: number) {}
}
