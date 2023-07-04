import { Injectable } from '@nestjs/common';

@Injectable()
export class StoreRepository {
    saveReview(orderId: number, userId: number, review: any) {
        return true;
    }
    findOneReview(userId: number, orderId: number) {
        return true;
    }
    getStore(storeId: number) {
        return {
            id: 1,
            ownerId: 1,
            storeName: '다른 수프집1',
            address: '주소',
        };
    }
}
