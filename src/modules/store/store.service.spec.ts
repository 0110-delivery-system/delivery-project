import { BadRequestException, Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

@Injectable()
class MockRepository {
    async findOneById(ownerId: any) {
        const storeInfo = {
            id: 1,
            ownerId: 1,
            storeName: '다른 수프집',
            address: '주소',
        };
        if (storeInfo.ownerId === ownerId) return storeInfo;
        return null;
    }

    async createStore(storeName: string, address: string, ownerId: number) {
        return;
    }

    async getMany() {
        const storeList = [
            {
                id: 1,
                ownerId: 1,
                storeName: '다른 수프집1',
                address: '주소',
            },
            {
                id: 2,
                ownerId: 2,
                storeName: '다른 수프집2',
                address: '주소',
            },
            {
                id: 3,
                ownerId: 3,
                storeName: '다른 수프집3',
                address: '주소',
            },
        ];
        return storeList;
    }
}

@Injectable()
class StoreService {
    constructor(private readonly mockRepository: MockRepository) {}

    async createStore(storeName: string, address: string, ownerId: number) {
        const existOwnerStore = await this.getStore(ownerId);

        if (existOwnerStore) throw new BadRequestException('한개의 가게만 등록이 가능합니다.');

        await this.mockRepository.createStore(storeName, address, ownerId);
        return;
    }

    async getManyStore() {
        const storeList = await this.mockRepository.getMany();

        return storeList;
    }

    async getStore(ownerId: number) {
        return await this.mockRepository.findOneById(ownerId);
    }
}
describe('StoreService', () => {
    let service: StoreService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [StoreService, MockRepository],
        }).compile();

        service = module.get<StoreService>(StoreService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('매장 생성/저장한다.', () => {
        it('등록된 매장이 없다면 매장 등록에 성공한다 - 성공', async () => {
            const ownerId = 2;
            const storeName = '엉덩국 수프';
            const address = '주소';

            expect(await service.createStore(storeName, address, ownerId)).toBeUndefined();
        });

        it('등록된 매장이 있다면 매장 등록에 실패한다 - 실패', async () => {
            const ownerId = 1;
            const storeName = '엉덩국 수프';
            const address = '주소';

            await expect(async () => await service.createStore(storeName, address, ownerId)).rejects.toThrowError(new BadRequestException('한개의 가게만 등록이 가능합니다.'));
        });
    });

    describe('여러개의 매장정보를 제공한다.', () => {
        it('여러개의 매장정보를 가져온다.', async () => {
            const storeList = [
                {
                    id: 1,
                    ownerId: 1,
                    storeName: '다른 수프집1',
                    address: '주소',
                },
                {
                    id: 2,
                    ownerId: 2,
                    storeName: '다른 수프집2',
                    address: '주소',
                },
                {
                    id: 3,
                    ownerId: 3,
                    storeName: '다른 수프집3',
                    address: '주소',
                },
            ];

            expect(await service.getManyStore()).toEqual(storeList);
        });
    });

    describe('하나의 매장 정보를 제공한다.', () => {
        it('사장님의 매장이 존재한다면 매장정보를 제공한다. - 성공', async () => {
            const ownerId = 1;

            const storeInfo = {
                id: 1,
                ownerId: 1,
                storeName: '다른 수프집',
                address: '주소',
            };

            expect(await service.getStore(ownerId)).toEqual(storeInfo);
        });

        it('사장님의 매장이 존재하지않는다면 매장정보를 제공하지 못한다. - 실패', async () => {
            const ownerId = 3;

            expect(await service.getStore(ownerId)).toBeNull();
        });
    });
});
