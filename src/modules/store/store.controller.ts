import { Controller, Post, Get } from '@nestjs/common';
import { StoreService } from './store.service';
import { Body } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { BadRequestException } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/passport/guard/jwt-auth.guard';

@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @UseGuards(JwtAuthGuard)
    @Post('createStore')
    async createStore(@Body() body: CreateStoreDto) {
        try {
            await this.storeService.createStore(body);
            return { message: 'Store created successfully' };
        } catch (error) {
            throw new BadRequestException('Failed to create store');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('getManyStore')
    async getManyStore() {
        return await this.storeService.getManyStore();
    }
}
