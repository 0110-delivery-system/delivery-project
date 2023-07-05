import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { IBookmarkRepository } from './bookmark.IRepository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookmarkRepository implements IBookmarkRepository {
    constructor(
        @InjectRepository(Bookmark)
        private bookmarkModel: Repository<Bookmark>
    ) {}

    async getManyUserBookmark(userId: number): Promise<number[]> {
        const bookmarks = await this.bookmarkModel.find({ where: { UserId: userId } });
        const storeIds = bookmarks.map((bookmark) => bookmark.StoreId);
        return storeIds;
    }

    async saveFavoriteStore(userId: number, storeId: number): Promise<boolean> {
        const bookmark = this.bookmarkModel.create();
        bookmark.UserId = userId;
        bookmark.StoreId = storeId;
        try {
            await this.bookmarkModel.save(bookmark);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async removeFavoriteStore(userId: number, storeId: number): Promise<boolean> {
        const deleteResult = await this.bookmarkModel.delete({ UserId: userId, StoreId: storeId });
        return deleteResult.affected > 0;
    }
}
