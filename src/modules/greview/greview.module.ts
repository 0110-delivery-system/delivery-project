import { Module } from '@nestjs/common';
import { GreviewService } from './greview.service';
import { GreviewController } from './greview.controller';

@Module({
  controllers: [GreviewController],
  providers: [GreviewService]
})
export class GreviewModule {}
