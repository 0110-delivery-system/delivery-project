import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnerRepository {
    constructor(
        @InjectRepository(Owner)
        private ownerRepository: Repository<Owner>
    ) {}

    async findOneByEmail(email: string): Promise<Owner | null> {
        return await this.ownerRepository.findOne({ where: { email: email } });
    }

    async createOwner(email: string, password: string, name: string): Promise<void> {
        const owner = this.ownerRepository.create();
        owner.email = email;
        owner.password = password;
        owner.name = name;

        await this.ownerRepository.save(owner);
    }
}
