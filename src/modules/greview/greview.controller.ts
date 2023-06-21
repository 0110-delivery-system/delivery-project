import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GreviewService } from './greview.service';
import { CreateGreviewDto } from './dto/create-greview.dto';
import { UpdateGreviewDto } from './dto/update-greview.dto';

@Controller('greview')
export class GreviewController {
  constructor(private readonly greviewService: GreviewService) {}

  @Post()
  create(@Body() createGreviewDto: CreateGreviewDto) {
    return this.greviewService.create(createGreviewDto);
  }

  @Get()
  findAll() {
    return this.greviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.greviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGreviewDto: UpdateGreviewDto) {
    return this.greviewService.update(+id, updateGreviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.greviewService.remove(+id);
  }
}
