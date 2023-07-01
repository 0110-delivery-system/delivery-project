import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bookmark } from './entities/bookmark.entity';

@Injectable()
export class BookmarkRepository extends Repository<Bookmark> {
    async getManyUserBookmark(userId: number): Promise<Bookmark[]> {
        return this.find({ where: { UserId: userId } });
    }

    async saveFavoriteStore(userId: number, storeId: number): Promise<void> {
        const bookmark = new Bookmark();
        bookmark.UserId = userId;
        bookmark.StoreId = storeId;
        await this.save(bookmark);
    }

    async removeFavoriteStore(userId: number, storeId: number): Promise<void> {
        await this.delete({ UserId: userId, StoreId: storeId });
    }
}
