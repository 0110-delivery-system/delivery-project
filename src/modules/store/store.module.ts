import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { StoreRepository } from './store.repository';

@Module({
    controllers: [StoreController],
    providers: [StoreService, StoreRepository],
    exports: [StoreRepository],
})
export class StoreModule {}
