import { IMenuRepository } from './menu.IRepository';
import { Injectable } from '@nestjs/common';
import { Menu } from './entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuRepository implements IMenuRepository {
    constructor(
        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>
    ) {}
    async createMenu(storeId: number, newMenu: any): Promise<Menu> {
        const menu = this.menuRepository.create();
        menu.storeId = storeId;
        menu.name = newMenu.name;
        menu.price = newMenu.price;

        const createdMenu = await this.menuRepository.save(menu);
        return createdMenu;
    }

    async getManyMenu(storeId: number): Promise<Menu[]> {
        const menus = await this.menuRepository.find({ where: { storeId: storeId } });
        return menus;
    }

    async getMenu(storeId: number, menuId: number): Promise<Menu | null> {
        const menu = await this.menuRepository.findOne({ where: { storeId: storeId, id: menuId } });
        return menu || null;
    }

    async updateMenu(menuId: number, newMenu: any): Promise<Menu | null> {
        const menu = await this.menuRepository.findOne({ where: { id: menuId } });
        if (!menu) {
            return null;
        }
        menu.name = newMenu.name;
        menu.price = newMenu.price;
        const updatedMenu = await this.menuRepository.save(menu);
        return updatedMenu;
    }

    async deleteMenu(menuId: number): Promise<void> {
        await this.menuRepository.delete(menuId);
    }
}
