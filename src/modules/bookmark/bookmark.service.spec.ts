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
            it('존재하는 매장인지 확인', async () => {
                jest.spyOn(storeRepositry, 'findOneStoreName').mockResolvedValueOnce(true);
                const result = await bookmarkService.findOneStoreName(storeId);
                expect(result).not.toBeNull();
            });
        });
        describe('saveFavoriteStore', () => {
            const storeId = 1;
            const userId = 1;
            it('즐겨찾기 매장 저장', async () => {
                await bookmarkService.saveFavoriteStore(storeId, userId);
                const user = await authService.getUser(userId);
                expect(user.bookmark).toContain(storeId);
            });
        });
    });
});
