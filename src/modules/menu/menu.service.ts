import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { IStoreRepository } from '../store/store.IStoreRepository';
import { IMenuRepository } from './menu.IRepository';

@Injectable()
export class MenuService {
    constructor(@Inject(IMenuRepository) private menuRepository: IMenuRepository, @Inject(IStoreRepository) private storeRepository: IStoreRepository) {}

    async addMenu(storeId: number, createMenuDto: CreateMenuDto) {
        const validateResult = this.validateMenu(storeId, createMenuDto);
        if (validateResult) {
            const result = await this.menuRepository.createMenu(storeId, createMenuDto);
            if (result) {
                return createMenuDto;
            } else {
                return false;
            }
        }
    }

    async validateMenu(storeId, newMenu) {
        const existingMenus = await this.getManyMenu(storeId);
        const isExistingMenu = existingMenus.some((menu) => menu.name === newMenu.name);
        const isExistingStore = await this.storeRepository.getStore(storeId);

        if (isExistingMenu) {
            throw new BadRequestException('이미 존재하는 메뉴입니다.');
        }
        if (newMenu.name === '') {
            throw new BadRequestException('메뉴 이름을 입력해주세요.');
        }
        if (newMenu.name === null) {
            throw new BadRequestException('메뉴 이름을 입력해주세요.');
        }
        if (newMenu.price === null) {
            throw new BadRequestException('메뉴 가격을 입력해주세요.');
        }
        if (newMenu.price < 0) {
            throw new BadRequestException('메뉴 가격은 0원 이상이어야 합니다.');
        }
        if (!isExistingStore) {
            throw new BadRequestException('존재하지 않는 가게입니다.');
        }

        return true;
    }

    async getManyMenu(storeId: number) {
        return await this.menuRepository.getManyMenu(storeId);
    }

    async getMenu(storeId: number, menuId: number) {
        return await this.menuRepository.getMenu(storeId, menuId);
    }

    async validateUpdateMenu(storeId, menuId, updateMenu) {
        const existingMenus = await this.getManyMenu(storeId);
        const existingMenu = existingMenus.find((menu) => menu.id === updateMenu.id);
        const isExistingStore = await this.storeRepository.getStore(storeId);

        if (existingMenu === undefined) {
            throw new BadRequestException('존재하지 않는 메뉴입니다.');
        }
        if (updateMenu.name === '') {
            throw new BadRequestException('메뉴 이름을 입력해주세요.');
        }
        if (updateMenu.price === null) {
            throw new BadRequestException('메뉴 가격을 입력해주세요.');
        }
        if (updateMenu.price < 0) {
            throw new BadRequestException('메뉴 가격은 0원 이상이어야 합니다.');
        }
        if (isExistingStore === null) {
            throw new BadRequestException('존재하지 않는 가게입니다.');
        }
        return true;
    }

    async updateMenu(storeId: number, menuId: number, updateMenuDto: UpdateMenuDto) {
        const validateResult = await this.validateUpdateMenu(storeId, menuId, updateMenuDto);
        if (validateResult) {
            const result = await this.menuRepository.updateMenu(menuId, updateMenuDto);
            if (result) {
                return result;
            } else {
                return false;
            }
        }
    }

    async validateDeleteMenu(storeId, menuId) {
        const existingMenus = await this.getManyMenu(storeId);
        const existingMenu = existingMenus.find((menu) => menu.id === menuId);
        const isExistingStore = await this.storeRepository.getStore(storeId);
        if (!existingMenu) {
            throw new BadRequestException('존재하지 않는 메뉴입니다.');
        } else if (!isExistingStore) {
            throw new BadRequestException('존재하지 않는 가게입니다.');
        } else {
            return true;
        }
    }

    async removeMenu(storeId: number, menuId: number) {
        const validateResult = await this.validateDeleteMenu(storeId, menuId);
        if (validateResult) {
            const result = await this.menuRepository.deleteMenu(menuId);
            return result;
        }
    }
}
