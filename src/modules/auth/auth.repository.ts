import { Injectable } from '@nestjs/common';
import { IAuthRepository } from './auth.IRepository';

@Injectable()
export class AuthRepository implements IAuthRepository {
    findUserByEmail(email: any) {
        return {
            id: 1,
            email: 'teset@email.com',
            password: '1234',
        };
    }
    createUser(email: string, password: string): Promise<void> {
        return;
    }
    findeUserById(userId: number) {
        return {
            id: 1,
            email: 'teset@email.com',
            password: '1234',
        };
    }
}
