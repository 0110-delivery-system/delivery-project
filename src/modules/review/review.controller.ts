import { Controller, Post, Param, Body, Get, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../auth/passport/guard/jwt-auth.guard';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @UseGuards(JwtAuthGuard)
    @Post(':userId/:orderId')
    async createReview(@Param('userId') userId: number, @Param('orderId') orderId: number, @Body() review: CreateReviewDto) {
        await this.reviewService.validateReview(userId, orderId, review);
        const createdReview = await this.reviewService.createReview(userId, orderId, review);
        return createdReview;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':reviewId')
    async getReview(@Param('reviewId') reviewId: number) {
        const review = await this.reviewService.getReview(reviewId);
        return review;
    }
}
