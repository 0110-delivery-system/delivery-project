import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryService } from './delivery.service';
import { IDeliveryRepository } from './delivery.IDeliveryRepository';

export class FakeDeliveryRepository implements IDeliveryRepository {
    saveDeliveryInfo(orderId: number, deliveryInfo: any) {
        if (orderId === 1) {
            return {
                deliveryId: 1,
                status: 'WAIT_DELIVERY',
                receiver: '김철수',
                deliveryAddress: '서울시 강남구',
            };
        }
    }
}

describe('DeliveryService', () => {
    let deliveryService: DeliveryService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeliveryService,
                {
                    provide: IDeliveryRepository,
                    useClass: FakeDeliveryRepository,
                },
            ],
        }).compile();

        deliveryService = module.get<DeliveryService>(DeliveryService);
    });

    it('should be defined', () => {
        expect(deliveryService).toBeDefined();
    });

    describe('validateCreteDelivery', () => {
        it('배달 주소지가 없을 때', async () => {
            const orderId = 2;
            const deliveryInfo = {
                receiver: '김철수',
                deliveryAddress: '',
            };
            expect(await deliveryService.createDelivery(orderId, deliveryInfo)).rejects.toThrowError(new Error('배달 주소지가 없습니다.'));
        });
        it('수령인이 없을 때', async () => {
            const orderId = 3;
            const deliveryInfo = {
                receiver: '',
                deliveryAddress: '서울시 강남구',
            };
            expect(await deliveryService.createDelivery(orderId, deliveryInfo)).rejects.toThrowError(new Error('수령인이 없습니다.'));
        });
    });

    describe('createDelivery', () => {
        it('배달 등록 - 성공', async () => {
            const orderId = 1;
            const deliveryInfo = {
                receiver: '김철수',
                deliveryAddress: '서울시 강남구',
            };
            expect(await deliveryService.createDelivery(orderId, deliveryInfo)).toEqual({
                status: 'WAIT_DELIVERY',
                deliveryId: 1,
                receiver: '김철수',
                deliveryAddress: '서울시 강남구',
            });
        });

        describe('validateStartDelivery', () => {
            it('배달 출발 가능 여부 확인 - 성공', async () => {
                const deliveryId = 1;
                expect(await deliveryService.validateStartDelivery(deliveryId)).toBe(true);
            });
        });
        it('배달 출발 가능 여부 확인 - 실패', async () => {
            const deliveryId = 2;
            expect(await deliveryService.validateStartDelivery(deliveryId)).rejects.toThrowError(new Error('이미 배달이 출발했습니다.'));
        });
    });

    describe('startDelivery', () => {
        it('배달 출발 - 성공', async () => {
            const deliveryId = 1;
            expect(await deliveryService.startDelivery(deliveryId)).toEqual({
                status: 'START_DELIVERY',
                deliveryId: 1,
                receiver: '김철수',
                deliveryAddress: '서울시 강남구',
            });
        });
    });

    describe('validateCompleteDelivery', () => {
        it('배달 완료 가능 여부 확인 - 성공', async () => {
            const deliveryId = 1;
            expect(await deliveryService.validateCompleteDelivery(deliveryId)).toEqual({
                status: 'START_DELIVERY',
            });
        });
        it('배달 완료 가능 여부 확인 - 실패', async () => {
            const deliveryId = 2;
            expect(await deliveryService.validateCompleteDelivery(deliveryId)).rejects.toThrowError(new Error('이미 배달이 완료되었습니다.'));
        });
    });

    describe('completeDelivery', () => {
        it('배달 완료 - 성공', async () => {
            const deliveryId = 1;
            expect(await deliveryService.completeDelivery(deliveryId)).toEqual({
                status: 'COMPLETE_DELIVERY',
                deliveryId: 1,
                receiver: '김철수',
                deliveryAddress: '서울시 강남구',
            });
        });
    });

    describe('getDeliveryStatus', () => {
        it('배달 진행상황 확인 - 성공', async () => {
            const deliveryId = 1;
            const result = await deliveryService.getDeliveryStatus(deliveryId);
            expect(result).toEqual({
                status: 'START_DELIVERY',
            });
        });
        it('배달 진행상황 확인 - 실패', async () => {
            const deliveryId = 2;
            const result = await deliveryService.getDeliveryStatus(deliveryId);
            expect(result).toBeNull();
        });
    });

    describe('getDeliveryInfo', () => {
        it('배달 정보 확인 - 성공', async () => {
            const deliveryId = 1;
            const result = await deliveryService.getDeliveryInfo(deliveryId);
            expect(result).toEqual({
                status: 'START_DELIVERY',
                deliveryId: 1,
                receiver: '김철수',
                deliveryAddress: '서울시 강남구',
            });
        });

        it('배달 정보 확인 - 실패', async () => {
            const deliveryId = 2;
            const result = await deliveryService.getDeliveryInfo(deliveryId);
            expect(result).toBeNull();
        });
    });
});
