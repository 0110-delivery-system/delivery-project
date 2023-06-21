import { Module } from '@nestjs/common';
import { DeilveryService } from './deilvery.service';
import { DeilveryController } from './deilvery.controller';

@Module({
  controllers: [DeilveryController],
  providers: [DeilveryService]
})
export class DeilveryModule {}
