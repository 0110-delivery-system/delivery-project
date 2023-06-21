import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeilveryService } from './deilvery.service';
import { CreateDeilveryDto } from './dto/create-deilvery.dto';
import { UpdateDeilveryDto } from './dto/update-deilvery.dto';

@Controller('deilvery')
export class DeilveryController {
  constructor(private readonly deilveryService: DeilveryService) {}

  @Post()
  create(@Body() createDeilveryDto: CreateDeilveryDto) {
    return this.deilveryService.create(createDeilveryDto);
  }

  @Get()
  findAll() {
    return this.deilveryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deilveryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeilveryDto: UpdateDeilveryDto) {
    return this.deilveryService.update(+id, updateDeilveryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deilveryService.remove(+id);
  }
}
