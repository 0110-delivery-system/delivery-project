import { BadRequestException, Injectable } from '@nestjs/common';
import { IStoreRepository } from './store.IStoreRepository';
import { Inject } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';

@Injectable()
export class StoreService {
    constructor(@Inject(IStoreRepository) private storeRepository: IStoreRepository) {}

    async createStore(body: CreateStoreDto) {
        console.log(body);
        const { storeName, address, ownerId } = body;
        const existOwnerStore = await this.getStore(ownerId);
        if (existOwnerStore) throw new BadRequestException('한개의 가게만 등록이 가능합니다.');
        await this.storeRepository.createStore(storeName, address, ownerId);
        return;
    }

    async getManyStore() {
        const storeList = await this.storeRepository.getMany();
        return storeList;
    }

    async getStore(ownerId: number) {
        return await this.storeRepository.findOneById(ownerId);
    }
}
