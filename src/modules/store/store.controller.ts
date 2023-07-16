import { Controller, Post, Get } from '@nestjs/common';
import { StoreService } from './store.service';
import { Body } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { BadRequestException } from '@nestjs/common';

@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @Post('createStore')
    async createStore(@Body() body: CreateStoreDto) {
        try {
            await this.storeService.createStore(body);
            return { message: 'Store created successfully' };
        } catch (error) {
            throw new BadRequestException('Failed to create store');
        }
    }

    @Get('getManyStore')
    async getManyStore() {
        return await this.storeService.getManyStore();
    }
}
