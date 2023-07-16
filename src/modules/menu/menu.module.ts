import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuRepository } from './menu.repository';
import { StoreModule } from '../store/store.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { IMenuRepository } from './menu.IRepository';

@Module({
    imports: [TypeOrmModule.forFeature([Menu]), StoreModule],
    controllers: [MenuController],
    providers: [MenuService, { provide: IMenuRepository, useClass: MenuRepository }],
    exports: [IMenuRepository],
})
export class MenuModule {}
