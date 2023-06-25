import { Test, TestingModule } from '@nestjs/testing';
import { MenuService } from './menu.service';
import { BadRequestException } from '@nestjs/common';
import { IMenuRepository } from './menu.IRepository';

export class FakeMenuRepository implements IMenuRepository {
    createMenu(storeId: number, newMenu: any) {
        const createdMenu = { name: newMenu.name, price: newMenu.price };
        return createdMenu;
    }

    getManyMenu(storeId: number) {
        const menus = [
            { name: '제육볶음', price: 7000 },
            { name: '김치찌개', price: 8000 },
            { name: '된장찌개', price: 9000 },
        ];
        const menus2 = [
            { id: 1, name: '김치찌개', price: 8000 },
            { id: 2, name: '된장찌개', price: 9000 },
        ];

        const menus3 = [
            { id: 1, name: '김치찌개', price: 8000 },
            { id: 2, name: '된장찌개', price: 9000 },
        ];

        const menus4 = [
            { id: 1, name: '제육볶음', price: 7000 },
            { id: 2, name: '김치찌개', price: 8000 },
        ];
        if (storeId === 1) {
            return menus;
        } else if (storeId === 2) {
            return menus2;
        } else if (storeId === 3) {
            return menus3;
        } else if (storeId === 4) {
            return menus4;
        }
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

export class FakeStoreService {
    getStore(storeId: number) {
        if (storeId === 2) {
            return null;
        } else {
            return { id: 2, name: 'test' };
        }
    }
}

describe('MenuService', () => {
    let menuService: MenuService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MenuService, { provide: IMenuRepository, useClass: FakeMenuRepository }, { provide: FakeStoreService, useClass: FakeStoreService }],
        }).compile();

        menuService = module.get<MenuService>(MenuService);
    });

    it('should be defined', () => {
        expect(menuService).toBeDefined();
    });

    describe('validateMenu', () => {
        it('이미 존재하는 메뉴 경우 - 실패', async () => {
            const storeId = 1;
            const newMenu = { name: '제육볶음', price: 7000 };
            await expect(menuService.validateMenu(storeId, newMenu)).rejects.toThrowError(new BadRequestException('이미 존재하는 메뉴입니다.'));
        });

        it('메뉴 이름이 없는 경우 - 실패', async () => {
            const storeId = 1;
            const newMenu = { name: '', price: 7000 };
            await expect(menuService.validateMenu(storeId, newMenu)).rejects.toThrowError(new BadRequestException('메뉴 이름을 입력해주세요.'));
        });

        it('메뉴 이름이 없는 경우 - 실패', async () => {
            const storeId = 1;
            const newMenu = { name: null, price: 7000 };
            await expect(menuService.validateMenu(storeId, newMenu)).rejects.toThrowError(new BadRequestException('메뉴 이름을 입력해주세요.'));
        });

        it('메뉴 가격이 없는 경우 - 실패', async () => {
            const storeId = 1;
            const newMenu = { name: '불고기', price: null };
            await expect(menuService.validateMenu(storeId, newMenu)).rejects.toThrowError(new BadRequestException('메뉴 가격을 입력해주세요.'));
        });

        it('메뉴 가격이 음수인 경우 - 실패', async () => {
            const storeId = 1;
            const newMenu = { name: '불고기', price: -1 };
            await expect(menuService.validateMenu(storeId, newMenu)).rejects.toThrowError(new BadRequestException('메뉴 가격은 0원 이상이어야 합니다.'));
        });

        it('존재하지 않는 가게인 경우 - 실패', async () => {
            const storeId = 2;
            const newMenu = { name: '불고기', price: 7000 };
            await expect(menuService.validateMenu(storeId, newMenu)).rejects.toThrowError(new BadRequestException('존재하지 않는 가게입니다.'));
        });

        it('성공', async () => {
            const storeId = 1;
            const newMenu = { name: '불고기', price: 7000 };
            await expect(menuService.validateMenu(storeId, newMenu)).resolves.toBe(true);
        });
    });

    describe('addMenu', () => {
        it('메뉴 작성 - 성공', async () => {
            const storeId = 1;
            const newMenu = { name: '불고기', price: 7000 };
            await expect(menuService.addMenu(storeId, newMenu)).resolves.toEqual(expect.objectContaining({ name: '불고기', price: 7000 }));
        });
    });

    it('메뉴 리스트 불러오기 - 성공', async () => {
        const storeId = 4;
        const expectedMenus = [
            { id: 1, name: '제육볶음', price: 7000 },
            { id: 2, name: '김치찌개', price: 8000 },
        ];

        await expect(menuService.getManyMenu(storeId)).resolves.toEqual(expect.arrayContaining(expectedMenus));
    });

    describe('getMenu', () => {
        it('메뉴 상세보기 - 성공', async () => {
            const storeId = 4;
            const menuId = 1;
            await expect(menuService.getMenu(storeId, menuId)).resolves.toEqual(expect.objectContaining({ id: 1, name: '제육볶음', price: 7000 }));
        });
    });

    describe('validateUpdateMenu', () => {
        it('메뉴 이름이 없는 경우 - 실패', async () => {
            const storeId = 3;
            const menuId = 1;
            const updateMenu = { id: 1, name: '', price: 7000 };
            await expect(menuService.validateUpdateMenu(storeId, menuId, updateMenu)).rejects.toThrowError(new BadRequestException('메뉴 이름을 입력해주세요.'));
        });

        it('메뉴 가격이 없는 경우 - 실패', async () => {
            const storeId = 3;
            const menuId = 1;
            const updateMenu = { id: 1, name: '제육볶음', price: null };
            await expect(menuService.validateUpdateMenu(storeId, menuId, updateMenu)).rejects.toThrowError(new BadRequestException('메뉴 가격을 입력해주세요.'));
        });

        it('메뉴 가격이 음수인 경우 - 실패', async () => {
            const storeId = 3;
            const menuId = 1;
            const updateMenu = { id: 1, name: '제육볶음', price: -1 };
            await expect(menuService.validateUpdateMenu(storeId, menuId, updateMenu)).rejects.toThrowError(new BadRequestException('메뉴 가격은 0원 이상이어야 합니다.'));
        });

        it('존재하지 않는 가게인 경우 - 실패', async () => {
            const storeId = 2;
            const menuId = 1;
            const updateMenu = { id: 1, name: '김치찌개', price: 8000 };
            await expect(menuService.validateUpdateMenu(storeId, menuId, updateMenu)).rejects.toThrowError(new BadRequestException('존재하지 않는 가게입니다.'));
        });
    });

    describe('updateMenu', () => {
        it('메뉴 수정 - 성공', async () => {
            const storeId = 4;
            const menuId = 1;
            const updateMenu = { id: 1, name: '제육볶음', price: 8000 };
            await expect(menuService.updateMenu(storeId, menuId, updateMenu)).resolves.toEqual(expect.objectContaining({ id: 1, name: '제육볶음', price: 8000 }));
        });
    });

    describe('validateDeleteMenu', () => {
        it('존재하지 않는 메뉴인 경우 - 실패', async () => {
            const storeId = 1;
            const menuId = 999;
            await expect(menuService.validateDeleteMenu(storeId, menuId)).rejects.toThrowError(new BadRequestException('존재하지 않는 메뉴입니다.'));
        });

        it('존재하지 않는 가게인 경우 - 실패', async () => {
            const storeId = 2;
            const menuId = 1;
            await expect(menuService.validateDeleteMenu(storeId, menuId)).rejects.toThrowError(new BadRequestException('존재하지 않는 가게입니다.'));
        });
    });

    describe('removeMenu', () => {
        it('메뉴 삭제 - 성공', async () => {
            const storeId = 4;
            const menuId = 1;
            await expect(menuService.removeMenu(storeId, menuId)).resolves.toBeUndefined();
        });
    });
});
