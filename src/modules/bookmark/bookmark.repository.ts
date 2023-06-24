import { IBookmarkRepository } from './bookmark.IRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookmarkRepository implements IBookmarkRepository {
    getManyUserBookmark(userId: number) {
        return;
    }
    saveFavoriteStore(userId: number, storeId: number): Promise<void> {
        return;
    }
}
