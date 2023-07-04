import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { ReviewService } from './review.service';
import { UpdatereviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Post(':userId/:orderId')
    async createReview(@Param('userId') userId: number, @Param('orderId') orderId: number, @Body() review: any) {
        await this.reviewService.validateReview(userId, orderId, review);
        const createdReview = await this.reviewService.createReview(orderId, userId, review);
        return createdReview;
    }

    @Get(':userId/:orderId')
    async getReview(@Param('userId') userId: number, @Param('orderId') orderId: number) {
        const review = await this.reviewService.getReview(userId, orderId);
        return review;
    }
}
