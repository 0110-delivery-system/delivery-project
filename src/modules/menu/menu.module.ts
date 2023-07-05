import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuRepository } from './menu.repository';
import { StoreModule } from '../store/store.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from '../delivery/entities/delivery.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Delivery]), StoreModule],
    controllers: [MenuController],
    providers: [MenuService, MenuRepository],
})
export class MenuModule {}
