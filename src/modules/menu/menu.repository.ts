import { IMenuRepository } from './menu.IRepository';
import { Injectable } from '@nestjs/common';
import { Menu } from './entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuRepository implements IMenuRepository {
    constructor(@InjectRepository(Menu) private menuModel: Repository<Menu>) {}
    async createMenu(storeId: number, newMenu: any): Promise<Menu> {
        const menu = this.menuModel.create();
        menu.StoreId = storeId;
        menu.name = newMenu.name;
        menu.price = newMenu.price;

        const createdMenu = await this.menuModel.save(menu);
        return createdMenu;
    }

    async getManyMenu(storeId: number): Promise<Menu[]> {
        const menus = await this.menuModel.find({ where: { StoreId: storeId } });
        return menus;
    }

    async getMenu(storeId: number, menuId: number): Promise<Menu | null> {
        const menu = await this.menuModel.findOne({ where: { StoreId: storeId, id: menuId } });
        return menu || null;
    }

    async updateMenu(menuId: number, newMenu: any): Promise<Menu | null> {
        const menu = await this.menuModel.findOne({ where: { id: menuId } });
        if (!menu) {
            return null;
        }
        menu.name = newMenu.name;
        menu.price = newMenu.price;
        const updatedMenu = await this.menuModel.save(menu);
        return updatedMenu;
    }

    async deleteMenu(menuId: number): Promise<void> {
        await this.menuModel.delete(menuId);
    }
}
