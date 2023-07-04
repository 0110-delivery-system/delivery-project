import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { OwnerRepository } from './owner.repositioy';

@Module({
    controllers: [OwnerController],
    providers: [OwnerService, OwnerRepository],
})
export class OwnerModule {}
