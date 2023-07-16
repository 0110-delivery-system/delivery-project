import { IStoreRepository } from '../store/store.IStoreRepository';
import { BookmarkRepository } from './bookmark.repository';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class BookmarkService {
    constructor(@Inject(BookmarkRepository) private bookmarkRepository: BookmarkRepository, @Inject(IStoreRepository) private storeRepository: IStoreRepository) {}

    async validateAddFavoriteStore(storeId: number, userId: number) {
        const store = await this.findOneStoreId(storeId);
        const bookmark = await this.bookmarkRepository.getManyUserBookmark(userId);
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
        const store = await this.storeRepository.getStore(storeId);
        return store ?? null;
    }

    async validateSavedFavoriteStore(userId: number, storeId: number) {
        const bookmark = await this.bookmarkRepository.getManyUserBookmark(userId);
        if (bookmark.indexOf(storeId)) {
            return true;
        } else if (!bookmark.indexOf(storeId)) {
            throw new BadRequestException('즐겨찾기 된 매장이 아닙니다.');
        }
    }

    async deleteFavoriteStore(userId: number, storeId: number) {
        const validateResult = await this.validateSavedFavoriteStore(userId, storeId);
        if (validateResult) {
            const removeResult = await this.bookmarkRepository.removeFavoriteStore(userId, storeId);
            if (removeResult) {
                return true;
            } else {
                return false;
            }
        }
    }
}
