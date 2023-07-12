import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @Post('/:storeId')
    addMenu(@Param('storeId') storeId: number, @Body() createMenuDto: CreateMenuDto) {
        return this.menuService.addMenu(storeId, createMenuDto);
    }

    @Get(':storeId')
    getManyMenu(@Param('storeId') storeId: number) {
        return this.menuService.getManyMenu(storeId);
    }

    @Get(':menuId')
    getMenu(@Param('storeId') storeId: number, @Param('menuId') menuId: number) {
        return this.menuService.getMenu(storeId, menuId);
    }

    @Put(':menuId')
    updateMenu(@Param('storeId') storeId: number, @Param('menuId') menuId: number, @Body() updateMenuDto: UpdateMenuDto) {
        return this.menuService.updateMenu(storeId, menuId, updateMenuDto);
    }

    @Delete(':menuId')
    removeMenu(@Param('storeId') storeId: number, @Param('menuId') menuId: number) {
        return this.menuService.removeMenu(storeId, menuId);
    }
}
