import { Controller, Post, Body } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('owner')
export class OwnerController {
    constructor(private readonly ownerService: OwnerService) {}

    @Post()
    async createOwner(@Body() body: CreateUserDto) {}
}
