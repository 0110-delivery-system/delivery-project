export interface IStoreRepository {
    createStore(storeName: string, address: string, ownerId: number);
    getMany();
    findOneById(ownerId: number);
    getStore(storeId: number);
}

export const IStoreRepository = Symbol('IStoreRepository');
