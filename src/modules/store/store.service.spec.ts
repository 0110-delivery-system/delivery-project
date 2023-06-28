import { BadRequestException, Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

@Injectable()
class MockRepository {
    async findOneByOwnerId(ownerId: number) {
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
        const existOwnerStore = await this.mockRepository.findOneByOwnerId(ownerId);

        if (existOwnerStore) throw new BadRequestException('한개의 가게만 등록이 가능합니다.');

        await this.mockRepository.createStore(storeName, address, ownerId);
        return;
    }

    async getManyStore() {
        const storeList = await this.mockRepository.getMany();

        return storeList;
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

            // 매장 카테고리 또는 지역별? 필요한거같은ㄷ ㅔ졸리니 패스
            expect(await service.getManyStore()).toEqual(storeList);
        });
    });

    describe('하나의 매장 정보를 제공한다.', () => {
        it('WLWL', () => {
            expect('');
        });
    });
});
// - 매장 조회 기능 ( getManyStore )
//     - 준비물 : DB ( 매장(오너컬럼) )
//     - ***사장 하나 =  매장 하나***
// - 음식점 정보 등록 Unit ( createStore() )
//     - 준비물: DB (store, owner)
//     - 성공
//         - DB에 음식점 정보를 등록한다
//     - 실패
//         - 존재하지 않는 Owner일 경우
//         - Owner나 store 이름 등 필요한 값이 존재하지 않을 경우
// - 음식점 정보 검증 Unit (validateStore() )
//     - 준비물: DB (store)
//     - 성공
//         - 음식점 정보 검증에 성공했을 경우
//     - 실패
//         - 이미 존재하는 음식점일 경우
//         - Owner나 store 이름 등 필요한 값이 존재하지 않을 경우
