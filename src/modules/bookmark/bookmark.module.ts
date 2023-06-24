import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { BookmarkRepository } from './bookmark.repository';

@Module({
    controllers: [BookmarkController],
    providers: [
        BookmarkService,
        {
            provide: 'IBookmarkRepository',
            useClass: BookmarkRepository,
        },
    ],
})
export class BookmarkModule {}
