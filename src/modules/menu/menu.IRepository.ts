export interface IMenuRepository {
    createMenu(storeId: number, newMenu: any);
    getManyMenu(storeId: number);
    getMenu(storeId: number, menuId: number);
    updateMenu(menuId: number, newMenu: any);
    deleteMenu(storeId: number, menuId: number);
}

export const IMenuRepository = Symbol('IMenuRepository');
