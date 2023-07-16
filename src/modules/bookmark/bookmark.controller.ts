import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';

@Controller('bookmark')
export class BookmarkController {
    constructor(private readonly bookmarkService: BookmarkService) {}

    @Post('/:userId/:storeId')
    async addFavoriteStore(@Param('userId') userId: number, @Param('storeId') storeId: number): Promise<boolean> {
        const result = await this.bookmarkService.addFavoriteStore(userId, storeId);
        return result;
    }

    @Get('/:userId')
    async getManyFavoriteStores(@Param('userId') userId: number) {
        return this.bookmarkService.getManyFavoriteStores(userId);
    }

    @Delete(':userId/:storeId')
    async removeFavoriteStore(@Param('userId') userId: number, @Param('storeId') storeId: number): Promise<boolean> {
        return await this.bookmarkService.deleteFavoriteStore(userId, storeId);
    }
}
