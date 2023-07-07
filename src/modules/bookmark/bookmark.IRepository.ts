export interface IBookmarkRepository {
    getManyUserBookmark(userId);
    saveFavoriteStore(userId, storeId);
    removeFavoriteStore(userId, storeId);
}

export const IBookmarkRepository = Symbol('IBookmarkRepository');
