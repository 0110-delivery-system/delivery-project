import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { BookmarkRepository } from './bookmark.repository';
import { StoreModule } from '../store/store.module';

@Module({
    imports: [StoreModule],
    controllers: [BookmarkController],
    providers: [BookmarkService, BookmarkRepository],
    exports: [BookmarkRepository],
})
export class BookmarkModule {}
