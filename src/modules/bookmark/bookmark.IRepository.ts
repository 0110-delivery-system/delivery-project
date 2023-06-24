export interface IBookmarkRepository {
    getManyUserBookmark(userId);
    saveFavoriteStore(userId, storeId);
}

export const IBookmarkRepository = Symbol('IBookmarkRepository');
