import { IBookmarkRepository } from './bookmark.IRepository';
import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkService } from './bookmark.service';
import { BadRequestException } from '@nestjs/common';

export class FakeBookmarkRepository implements IBookmarkRepository {
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

export class FakeStoreService {
    getStore(storeId: number) {
        if (storeId === 1) {
            return null;
        } else {
            return { id: 2, name: 'test' };
        }
    }
}

describe('BookmarkService', () => {
    let bookmarkService: BookmarkService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BookmarkService, { provide: IBookmarkRepository, useClass: FakeBookmarkRepository }, { provide: FakeStoreService, useClass: FakeStoreService }],
        }).compile();

        bookmarkService = module.get<BookmarkService>(BookmarkService);
    });

    it('should be defined', () => {
        expect(bookmarkService).toBeDefined();
    });

    describe('validateAddFavoriteStore', () => {
        it('존재하지 않는 매장인지 확인', async () => {
            const storeId = 1;
            const userId = 1;
            await expect(bookmarkService.validateAddFavoriteStore(storeId, userId)).rejects.toThrowError(new BadRequestException('존재하지 않는 매장입니다.'));
        });
        it('이미 즐겨찾기에 추가된 매장일 경우', async () => {
            const storeId = 2;
            const userId = 1;
            await expect(bookmarkService.validateAddFavoriteStore(storeId, userId)).rejects.toThrowError(new BadRequestException('이미 즐겨찾기한 매장입니다.'));
        });
    });

    describe('addFavoriteStore', () => {
        const storeId = 3;
        const userId = 1;
        it('즐겨찾기 매장 저장', async () => {
            expect(await bookmarkService.addFavoriteStore(userId, storeId)).toBe(true);
        });
    });

    describe('validateSavedFavoriteStore', () => {
        it('즐겨찾기 된 매장이 아닐때', async () => {
            const userId = 1;
            const storeId = 4;
            await expect(bookmarkService.validateSavedFavoriteStore(userId, storeId)).rejects.toThrowError(new BadRequestException('즐겨찾기 된 매장이 아닙니다.'));
        });
    });

    describe('deleteFavoriteStore', () => {
        it('즐겨찾기 매장 삭제', async () => {
            const userId = 1;
            const storeId = 1;
            expect(await bookmarkService.deleteFavoriteStore(userId, storeId)).toBe(true);
        });
    });
});
