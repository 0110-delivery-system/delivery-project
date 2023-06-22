import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { reviewService } from './review.service';
import { CreatereviewDto } from './dto/create-review.dto';
import { UpdatereviewDto } from './dto/update-review.dto';

@Controller('review')
export class reviewController {
    constructor(private readonly reviewService: reviewService) {}

    @Post()
    create(@Body() createreviewDto: CreatereviewDto) {
        return this.reviewService.create(createreviewDto);
    }

    @Get()
    findAll() {
        return this.reviewService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.reviewService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatereviewDto: UpdatereviewDto) {
        return this.reviewService.update(+id, updatereviewDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reviewService.remove(+id);
    }
}
