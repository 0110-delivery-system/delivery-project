import { IMenuRepository } from './menu.IRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuRepository implements IMenuRepository {
    createMenu(storeId: number, newMenu: any) {
        return true;
    }
    getManyMenu(storeId: number) {
        return true;
    }
    getOneMenu(menuId: number) {
        return true;
    }
    updateMenu(menuId: number, newMenu: any) {
        return true;
    }
    deleteMenu(menuId: number) {
        return true;
    }
}
