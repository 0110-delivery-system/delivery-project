import { Injectable } from '@nestjs/common';
import { IOwnerRepository } from './owner.IRepository';

@Injectable()
export class OwnerRepository implements IOwnerRepository {
    async findOneByEmail(email: string): Promise<any> {
        const ownerInfo = {
            id: 1,
            ownerEmail: 'taesikyoon@naver.com',
            password: 1234,
        };
        if (email === 'taesikyoon@naver.com') {
            return ownerInfo;
        }
        return null;
    }
    createOwner(email: string, password: string, name: string) {
        return;
    }
}
