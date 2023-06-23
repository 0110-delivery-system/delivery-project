import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Injectable()
export class BookmarkService {
    create(createBookmarkDto: CreateBookmarkDto) {
        return 'This action adds a new bookmark';
    }

    getManyFavoriteStores(userId: number) {
        const bookmarkList = [
            { id: 1, name: '매장1' },
            { id: 2, name: '매장2' },
        ];
        return bookmarkList;
    }

    findOneStoreId(storeId: number) {
        return `This action returns a #${storeId} bookmark`;
    }

    update(id: number, updateBookmarkDto: UpdateBookmarkDto) {
        return `This action updates a #${id} bookmark`;
    }

    removeFavoriteStore(userId: number, storeId: number) {
        return `This action removes a #${userId} bookmark`;
    }

    saveFavoriteStore(userId: number, storeId: number) {
        return `This action save a #${userId} bookmark`;
    }
}
