import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { BookmarkRepository } from './bookmark.repository';
import { StoreModule } from '../store/store.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Bookmark]), StoreModule],
    controllers: [BookmarkController],
    providers: [BookmarkService, BookmarkRepository],
    exports: [BookmarkRepository],
})
export class BookmarkModule {}
