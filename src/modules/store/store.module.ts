import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { StoreRepository } from './store.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { IStoreRepository } from './store.IStoreRepository';

@Module({
    imports: [TypeOrmModule.forFeature([Store])],
    controllers: [StoreController],
    providers: [StoreService, { provide: IStoreRepository, useClass: StoreRepository }],
    exports: [IStoreRepository],
})
export class StoreModule {}
