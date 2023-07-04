import { IBookmarkRepository } from './bookmark.IRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookmarkRepository implements IBookmarkRepository {
    getManyUserBookmark(userId: number) {
        return [1, 2];
    }
    saveFavoriteStore(userId: number, storeId: number) {
        return true;
    }
    removeFavoriteStore(userId: number, storeId: number) {
        return true;
    }
}
