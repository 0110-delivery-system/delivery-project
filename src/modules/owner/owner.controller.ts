import { Controller, Post, Body } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { BadRequestException } from '@nestjs/common';

@Controller('owner')
export class OwnerController {
    constructor(private readonly ownerService: OwnerService) {}

    @Post('createOwner')
    async createOwner(@Body() body: CreateOwnerDto) {
        try {
            await this.ownerService.createOwner(body);
            return { message: 'Owner created successfully' };
        } catch (error) {
            throw new BadRequestException('Failed to create owner');
        }
    }
}
