import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { OwnerRepository } from './owner.repositioy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { IOwnerRepository } from './owner.IRepository';

@Module({
    imports: [TypeOrmModule.forFeature([Owner])],
    controllers: [OwnerController],
    providers: [OwnerService, { provide: IOwnerRepository, useClass: OwnerRepository }],
    exports: [IOwnerRepository],
})
export class OwnerModule {}
