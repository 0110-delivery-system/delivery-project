import { Injectable } from '@nestjs/common';
import { IOwnerRepository } from './owner.IRepository';

@Injectable()
export class OwnerRepository implements IOwnerRepository {
    findOneByEmail(email: string) {}
    createOwner(email: string, password: string, name: string) {}
}
