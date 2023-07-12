import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { IStoreRepository } from './store.IStoreRepository';

@Injectable()
export class StoreRepository implements IStoreRepository {
    constructor(
        @InjectRepository(Store)
        private storeRepository: Repository<Store>
    ) {}

    async createStore(storeName: string, address: string, ownerId: number) {
        const store = this.storeRepository.create();
        store.name = storeName;
        store.address = address;
        store.OwnerId = ownerId;

        await this.storeRepository.save(store);
    }

    async getMany() {
        return await this.storeRepository.find();
    }

    async findOneById(ownerId: number) {
        return await this.storeRepository.findOne({ where: { OwnerId: ownerId } });
    }

    async getStore(storeId: number) {
        return await this.storeRepository.findOne({ where: { id: storeId } });
    }
}
