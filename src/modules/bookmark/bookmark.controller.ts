import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';

@Controller('bookmark')
export class BookmarkController {
    constructor(private readonly bookmarkService: BookmarkService) {}

    @Post('/:userId/store/:storeId')
    async addFavoriteStore(@Param('userId') userId: number, @Param('storeId') storeId: number): Promise<boolean> {
        return await this.bookmarkService.addFavoriteStore(userId, storeId);
    }

    @Get('/:userId')
    async getManyFavoriteStores(@Param('userId') userId: number) {
        return this.bookmarkService.getManyFavoriteStores(userId);
    }

    @Get('/:storeId')
    async findOneStoreId(@Param('storeId') storeId: number) {
        return await this.bookmarkService.findOneStoreId(storeId);
    }

    @Delete(':userId/stores/:storeId')
    async removeFavoriteStore(@Param('userId') userId: number, @Param('storeId') storeId: number): Promise<boolean> {
        return await this.bookmarkService.deleteFavoriteStore(userId, storeId);
    }
}
