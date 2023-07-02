import { IMenuRepository } from './menu.IRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuRepository implements IMenuRepository {
    createMenu(storeId: number, newMenu: any) {
        return;
    }
    getManyMenu(storeId: number) {
        return;
    }
    getMenu(menuId: number) {
        return;
    }
    updateMenu(menuId: number, newMenu: any) {
        return;
    }
    deleteMenu(menuId: number) {
        return;
    }
}
