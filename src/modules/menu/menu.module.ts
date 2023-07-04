import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuRepository } from './menu.repository';
import { StoreModule } from '../store/store.module';

@Module({
    imports: [StoreModule],
    controllers: [MenuController],
    providers: [MenuService, MenuRepository],
})
export class MenuModule {}
