import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkService } from './bookmark.service';

describe('BookmarkService', () => {
    let bookmarkService: BookmarkService;
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
        it('존재하는 매장인지 확인', async () => {
            jest.spyOn(storeRepositry, 'findOneStore').mockResolvedValueOnce(true);
            const result = await bookmarkService.findOneStore(storeId);
            expect(result).not.toBeNull();
        });
    });
});
