import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkService } from './bookmark.service';
import { AuthService } from '../auth/auth.service';

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
        describe('validateAddFavoriteStore', () => {
            const storeId = 1;
            const expectedStore = { id: '1', name: '매장1' };
            it('존재하는 매장인지 확인', async () => {
                const result = await bookmarkService.findOneStoreId(storeId);
                expect(result).not.toBe(expectedStore);
            });
            it('이미 존재하는 매장 일때', async () => {
                const result = await bookmarkService.findOneStoreId(storeId);
                expect(result).not.toBe(expectedStore);
            });
        });
        describe('saveFavoriteStore', () => {
            const storeId = 1;
            const userId = 1;
            it('즐겨찾기 매장 저장', async () => {
                await bookmarkService.saveFavoriteStore(userId, storeId);
                const user = await authService.getUser(userId);
                expect(user.bookmark).toContain(storeId);
            });
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
    describe('getManyFavoriteStore', () => {
        it('즐겨 찾기된 매장 조회', async () => {
            const userId = 1;
            const expectedFavoriteStores = [
                { id: '1', name: '매장1' },
                { id: '2', name: '매장2' },
            ];
            const favoriteStores = await bookmarkService.getManyFavoriteStores(userId);
            expect(favoriteStores).toEqual(expectedFavoriteStores);
        });
    });
});
