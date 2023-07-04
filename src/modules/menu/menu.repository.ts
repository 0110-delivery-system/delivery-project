import { IMenuRepository } from './menu.IRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuRepository implements IMenuRepository {
    createMenu(storeId: number, newMenu: any) {
        const createdMenu = { name: newMenu.name, price: newMenu.price };
        return createdMenu;
    }

    getManyMenu(storeId: number) {
        return [
            { id: 1, name: '제육볶음', price: 7000 },
            { id: 2, name: '김치찌개', price: 8000 },
        ];
    }

    getMenu(storeId: number, menuId: number) {
        const menu = { id: 1, name: '제육볶음', price: 7000 };
        if (storeId === 2) {
            return null;
        } else {
            return menu;
        }
    }

    updateMenu(menuId: number, newMenu: any) {
        const updatedMenu = { id: menuId, ...newMenu };
        return updatedMenu;
    }

    deleteMenu(menuId: number) {
        if (menuId === 1) {
            return undefined;
        }
    }
}
