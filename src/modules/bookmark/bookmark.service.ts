import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Injectable()
export class BookmarkService {
    create(createBookmarkDto: CreateBookmarkDto) {
        return 'This action adds a new bookmark';
    }

    findAll() {
        return `This action returns all bookmark`;
    }

    findOneStoreName(storeId: number) {
        return `This action returns a #${storeId} bookmark`;
    }

    update(id: number, updateBookmarkDto: UpdateBookmarkDto) {
        return `This action updates a #${id} bookmark`;
    }

    remove(id: number) {
        return `This action removes a #${id} bookmark`;
    }

    saveFavoriteStore(storeId: number, userId: number) {
        return `This action save a #${userId} bookmark`;
    }
}
