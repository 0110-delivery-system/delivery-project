import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Controller('bookmark')
export class BookmarkController {
    constructor(private readonly bookmarkService: BookmarkService) {}

    @Post()
    create(@Body() createBookmarkDto: CreateBookmarkDto) {
        return this.bookmarkService.create(createBookmarkDto);
    }

    @Post(':userId/stores/:storeId')
    async addFavoriteStore(@Param('userId') userId: number, @Param('storeId') storeId: number): Promise<boolean> {
        return await this.bookmarkService.addFavoriteStore(userId, storeId);
    }

    @Get('/bookmark/:userId')
    getManyFavoriteStores(@Param('userId') userId: number) {
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
