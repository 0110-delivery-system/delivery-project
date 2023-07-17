import { Controller, Post, Body, Param, Query, Get, Put, Delete, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtAuthGuard } from '../auth/passport/guard/jwt-auth.guard';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @UseGuards(JwtAuthGuard)
    @Post(':storeId')
    addMenu(@Param('storeId') storeId: number, @Body() createMenuDto: CreateMenuDto) {
        return this.menuService.addMenu(storeId, createMenuDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':storeId')
    getManyMenu(@Param('storeId') storeId: number) {
        return this.menuService.getManyMenu(storeId);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getMenu(@Query('storeId') storeId: number, @Query('menuId') menuId: number) {
        return this.menuService.getMenu(storeId, menuId);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    updateMenu(@Query('storeId') storeId: number, @Query('menuId') menuId: number, @Body() updateMenuDto: UpdateMenuDto) {
        return this.menuService.updateMenu(storeId, menuId, updateMenuDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    removeMenu(@Query('storeId') storeId: number, @Query('menuId') menuId: number) {
        return this.menuService.removeMenu(storeId, menuId);
    }
}
