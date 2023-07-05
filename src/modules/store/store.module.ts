import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { StoreRepository } from './store.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Store])],
    controllers: [StoreController],
    providers: [StoreService, StoreRepository],
    exports: [StoreRepository],
})
export class StoreModule {}
