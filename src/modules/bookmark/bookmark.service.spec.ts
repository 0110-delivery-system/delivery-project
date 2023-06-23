import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkService } from './bookmark.service';
import { AuthService } from '../auth/auth.service';
import { BadRequestException } from '@nestjs/common';

describe('BookmarkService', () => {
    let bookmarkService: BookmarkService;
    let authService: AuthService;
    let storeRepositry: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BookmarkService],
        }).compile();
        bookmarkService = module.get<BookmarkService>(BookmarkService);
    });

    it('should be defined', () => {
        expect(bookmarkService).toBeDefined();
    });

    describe('addFavoriteStore', () => {
        const storeId = 1;
        const userId = 1;
        describe('validateAddFavoriteStore', () => {
            it('존재하는 매장인지 확인', async () => {
                await expect(bookmarkService.validateAddFavoriteStore(storeId, userId)).rejects.toThrowError(new BadRequestException('존재하지 않는 매장입니다.'));
            });
            it('이미 즐겨찾기에 추가된 매장일 경우', async () => {
                const bookmark = [1, 2];
                expect(bookmark.includes(storeId)).rejects.toThrowError(new BadRequestException('이미 즐겨찾기한 매장입니다.'));
            });
        });
        it('즐겨찾기 매장 저장', async () => {
            await bookmarkService.saveFavoriteStore(userId, storeId);
            const user = await authService.getUser(userId);
            expect(user.bookmark).toContain(storeId);
        });
    });

    describe('removeFavoriteStore', () => {
        it('즐겨찾기 매장 삭제', async () => {
            const storeId = 1;
            const userId = 1;
            const user = await authService.getUser(userId);
            await bookmarkService.removeFavoriteStore(userId, storeId);
            expect(user.bookmark).not.toContain(storeId);
        });
        it('즐겨찾기 된 매장이 아닐때', async () => {
            const userId = 1;
            const storeId = 3;
            const favoriteStores = await bookmarkService.getManyFavoriteStores(userId);
            expect(favoriteStores).not.toContain(storeId);
        });
    });
    // describe('getManyFavoriteStore', () => {
    //     it('즐겨 찾기된 매장 조회', async () => {
    //         const userId = 1;
    //         const expectedFavoriteStores = [
    //             { id: '1', name: '매장1' },
    //             { id: '2', name: '매장2' },
    //         ];
    //         const favoriteStores = await bookmarkService.getManyFavoriteStores(userId);
    //         expect(favoriteStores).toEqual(expectedFavoriteStores);
    //     });
    // });
});
