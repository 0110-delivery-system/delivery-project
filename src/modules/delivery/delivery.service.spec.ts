import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryService } from './delivery.service';
import { IDeliveryRepository } from './delivery.IDeliveryRepository';
import { BadRequestException } from '@nestjs/common';

export class FakeDeliveryRepository implements IDeliveryRepository {
    createDelivery(orderId: number, deliveryInfo: any) {
        if (orderId === 1) {
            return {
                deliveryId: 1,
                status: 'WAIT_DELIVERY',
                receiver: '김철수',
                deliveryAddress: '서울시 강남구',
            };
        } else if (orderId === 2) {
            return {
                deliveryId: 2,
                status: 'START_DELIVERY',
                receiver: '김철수',
                deliveryAddress: '서울시 강남구',
            };
        }
    }
    updateDeliveryStatus(deliveryId: number, status: string) {
        if (deliveryId === 1) {
            return {
                status: 'START_DELIVERY',
                deliveryId: 1,
                receiver: '김철수',
                deliveryAddress: '서울시 강남구',
            };
        } else if (deliveryId === 2) {
            return true;
        }
    }
    findOneDeliveryStatus(deliveryId: number) {
        if (deliveryId === 1) {
            return { status: 'WAIT_DELIVERY' };
        } else if (deliveryId === 2) {
            return { status: 'START_DELIVERY' };
        } else if (deliveryId === 3) {
            return { status: 'COMPLETE_DELIVERY' };
        } else if (deliveryId === 4) {
            return null;
        }
    }
    findOneDeliveryInfo(deliveryId: number) {
        if (deliveryId === 1) {
            return {
                status: 'START_DELIVERY',
                deliveryId: 1,
                receiver: '김철수',
                deliveryAddress: '서울시 강남구',
            };
        } else if (deliveryId === 2) {
            return null;
        }
        return;
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

    describe('validatecreateDelivery', () => {
        it('배달 주소지가 없을 때', async () => {
            const deliveryInfo = {
                receiver: '김철수',
                deliveryAddress: '',
            };
            await expect(deliveryService.validatecreateDelivery(deliveryInfo)).rejects.toThrowError(new BadRequestException('배달 주소지가 없습니다.'));
        });

        it('수령인이 없을 때', async () => {
            const deliveryInfo = {
                receiver: '',
                deliveryAddress: '서울시 강남구',
            };
            await expect(deliveryService.validatecreateDelivery(deliveryInfo)).rejects.toThrowError(new BadRequestException('수령인이 없습니다.'));
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
    });
    describe('validateStartDelivery', () => {
        it('배달 출발 가능 여부 확인 - 성공', async () => {
            const deliveryId = 1;
            expect(await deliveryService.validateStartDelivery(deliveryId)).toBe(true);
        });

        it('배달 출발 가능 여부 확인(이미 출발한 배달) - 실패', async () => {
            const deliveryId = 2;
            await expect(deliveryService.validateStartDelivery(deliveryId)).rejects.toThrowError(new Error('이미 배달이 출발했습니다.'));
        });

        it('배달 출발 가능 여부 확인(이미 완료된 배달) - 실패', async () => {
            const deliveryId = 3;
            await expect(deliveryService.validateStartDelivery(deliveryId)).rejects.toThrowError(new Error('이미 배달이 완료되었습니다.'));
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
            const deliveryId = 2;
            expect(await deliveryService.validateCompleteDelivery(deliveryId)).toBe(true);
        });

        it('배달 완료 가능 여부 확인(아직 출발하지 않은 배달) - 실패', async () => {
            const deliveryId = 1;
            await expect(deliveryService.validateCompleteDelivery(deliveryId)).rejects.toThrowError(new Error('아직 배달이 출발하지 않았습니다.'));
        });

        it('배달 완료 가능 여부 확인(이미 완료된 배달) - 실패', async () => {
            const deliveryId = 3;
            await expect(deliveryService.validateCompleteDelivery(deliveryId)).rejects.toThrowError(new Error('이미 배달이 완료되었습니다.'));
        });
    });

    describe('completeDelivery', () => {
        it('배달 완료 - 성공', async () => {
            const deliveryId = 2;
            expect(await deliveryService.completeDelivery(deliveryId)).toBe(true);
        });
    });

    describe('getDeliveryStatus', () => {
        it('배달 진행상황 확인 - 성공', async () => {
            const deliveryId = 2;
            const result = await deliveryService.getDeliveryStatus(deliveryId);
            expect(result).toEqual({
                status: 'START_DELIVERY',
            });
        });
        it('배달 진행상황 확인 - 실패', async () => {
            const deliveryId = 4;
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
