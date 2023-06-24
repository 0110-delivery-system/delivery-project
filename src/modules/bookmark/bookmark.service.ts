import { BadRequestException, Injectable } from '@nestjs/common';
import { StoreService } from '../store/store.service';
import { IBookmarkRepository } from './bookmark.IRepository';

@Injectable()
export class BookmarkService {
    constructor(private storeService: StoreService, private bookmarkRepository: IBookmarkRepository) {}

    validateAddFavoriteStore(storeId: number, userId: number) {
        const store = this.findOneStoreId(storeId);
        const bookmark = this.bookmarkRepository.getManyUserBookmark(userId);
        if (store === null) {
            throw new BadRequestException('존재하지 않는 매장입니다.');
        } else if (bookmark.includes(storeId)) {
            throw new BadRequestException('이미 즐겨찾기한 매장입니다.');
        } else {
            return true;
        }
    }

    async addFavoriteStore(userId: number, storeId: number) {
        const validateResult = await this.validateAddFavoriteStore(storeId, userId);
        if (validateResult) {
            const saveResult = await this.bookmarkRepository.saveFavoriteStore(userId, storeId);
            if (saveResult) {
                return true;
            } else {
                return false;
            }
        }
    }

    async getManyFavoriteStores(userId: number) {
        const bookmark = await this.bookmarkRepository.getManyUserBookmark(userId);
        return bookmark ?? null;
    }

    async findOneStoreId(storeId: number) {
        const store = await this.storeService.getStore(storeId);
        return store ?? null;
    }

    async removeFavoriteStore(userId: number, storeId: number) {
        const bookmark = await this.bookmarkRepository.getManyUserBookmark(userId);
        if (bookmark.includes(storeId)) {
            await this.bookmarkRepository.saveFavoriteStore(userId, storeId);
        } else if (!bookmark.includes(storeId)) {
            throw new BadRequestException('즐겨찾기 된 매장이 아닙니다.');
        }
    }
}
