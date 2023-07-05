import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bookmark } from './entities/bookmark.entity';

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
