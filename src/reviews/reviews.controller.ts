import {
    Controller,
    Post,
    Body,
    UseGuards,
    Request,
    Get,
    Param,
    ParseIntPipe,
    Delete,
    Patch,
  } from '@nestjs/common';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { CreateReviewDto } from './dto/create-review.dto';
  import { UpdateReviewDto } from './dto/update-review.dto';
  import { ReviewsService } from './reviews.service';
  
  @Controller('reviews')
  @UseGuards(JwtAuthGuard)
  export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}
  
    @Post()
    create(@Body() dto: CreateReviewDto, @Request() req: any) {
      return this.reviewsService.create(dto, req.user.userId);
    }
  
    @Get('provider/:providerId')
    getProviderReviews(@Param('providerId', ParseIntPipe) providerId: number) {
      return this.reviewsService.getProviderReviews(providerId);
    }
  
    @Get('provider/:providerId/average')
    getAverageRating(@Param('providerId', ParseIntPipe) providerId: number) {
      return this.reviewsService.getAverageRating(providerId);
    }

@Patch(':id')
async updateReview(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: UpdateReviewDto,
  @Request() req: any,
) {
  return this.reviewsService.updateReview(id, dto, req.user.userId);
}


@Delete(':id')
async deleteReview(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
  return this.reviewsService.deleteReview(id, req.user.userId);
}


@Get(':providerId')
async getReviewsForProvider(@Param('providerId', ParseIntPipe) providerId: number) {
  return this.reviewsService.getReviewsForProvider(providerId);
}



  }
  