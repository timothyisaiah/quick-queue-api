import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateReviewDto } from './dto/create-review.dto';
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
}
