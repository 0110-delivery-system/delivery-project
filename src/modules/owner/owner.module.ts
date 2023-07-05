import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { OwnerRepository } from './owner.repositioy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Owner])],
    controllers: [OwnerController],
    providers: [OwnerService, OwnerRepository],
})
export class OwnerModule {}
