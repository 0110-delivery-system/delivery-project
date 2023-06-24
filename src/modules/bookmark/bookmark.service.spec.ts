import { IBookmarkRepository } from './bookmark.IRepository';
import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkService } from './bookmark.service';
import { BadRequestException } from '@nestjs/common';

export class FakeBookmarkRepository implements IBookmarkRepository {
    getManyUserBookmark(userId: number) {
        return;
    }
    saveFavoriteStore(userId: number, storeId: number) {
        return true;
    }
}

describe('BookmarkService', () => {
    let bookmarkService: BookmarkService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BookmarkService, { provide: IBookmarkRepository, useClass: FakeBookmarkRepository }],
        }).compile();

        bookmarkService = module.get<BookmarkService>(BookmarkService);
    });

    it('should be defined', () => {
        expect(bookmarkService).toBeDefined();
    });

    describe('validateAddFavoriteStore', () => {
        const storeId = 1;
        const userId = 1;
        it('존재하는 매장인지 확인', async () => {
            await expect(bookmarkService.validateAddFavoriteStore(storeId, userId)).rejects.toThrowError(new BadRequestException('존재하지 않는 매장입니다.'));
        });
        it('이미 즐겨찾기에 추가된 매장일 경우', async () => {
            const bookmark = [1, 2];
            expect(bookmark.includes(storeId)).rejects.toThrowError(new BadRequestException('이미 즐겨찾기한 매장입니다.'));
        });
    });

    describe('addFavoriteStore', () => {
        const storeId = 1;
        const userId = 1;
        it('즐겨찾기 매장 저장', async () => {
            expect(await bookmarkService.addFavoriteStore(userId, storeId)).toBe(true);
        });
    });

    describe('removeFavoriteStore', () => {
        it('즐겨찾기 매장 삭제', async () => {
            const storeId = 1;
            const userId = 1;
            expect(await bookmarkService.removeFavoriteStore(userId, storeId)).toBe(true);
        });
        it('즐겨찾기 된 매장이 아닐때', async () => {
            const userId = 1;
            const storeId = 3;
            await expect(bookmarkService.removeFavoriteStore(userId, storeId)).rejects.toThrowError(new BadRequestException('즐겨찾기 된 매장이 아닙니다.'));
        });
    });
});
