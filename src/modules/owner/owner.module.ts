import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { MockOwnerRepository } from './owner.service.spec';
import { IOwnerRepository } from './owner.IRepository';

@Module({
    controllers: [OwnerController],
    providers: [
        OwnerService,
        {
            provide: IOwnerRepository,
            useClass: MockOwnerRepository,
        },
    ],
})
export class OwnerModule {}
