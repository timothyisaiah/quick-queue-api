import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,
    private usersService: UsersService,
  ) {}

  async create(dto: CreateReviewDto, clientId: number) {
    // Ensure provider exists
    const provider = await this.usersService.findOne(dto.providerId);
    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    // Ensure client exists
    const client = await this.usersService.findOne(clientId);
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    // Create the review instance
    const review = this.reviewRepo.create({
      rating: dto.rating,
      comment: dto.comment,
      client: client, // Assign client here
      provider: provider, // Assign provider here
    });

    return this.reviewRepo.save(review);
  }

  async getProviderReviews(providerId: number) {
    return this.reviewRepo.find({
      where: { provider: { id: providerId } },
      relations: ['client'],
      order: { createdAt: 'DESC' },
    });
  }

  async getAverageRating(providerId: number) {
    const { avg } = await this.reviewRepo
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'avg')
      .where('review.providerId = :providerId', { providerId })
      .getRawOne();

    return parseFloat(avg) || 0;
  }


  async updateReview(id: number, dto: UpdateReviewDto, clientId: number) {
    const review = await this.reviewRepo.findOne({ where: { id }, relations: ['client'] });
  
    if (!review) {
      throw new NotFoundException('Review not found');
    }
  
    if (review.client.id !== clientId) {
      throw new ForbiddenException('You can only update your own reviews');
    }
  
    review.rating = dto.rating;
  
    // Check if comment is provided before updating it
    if (dto.comment !== undefined) {
      review.comment = dto.comment;
    }
  
    return this.reviewRepo.save(review);
  }
  

async deleteReview(id: number, clientId: number) {
    const review = await this.reviewRepo.findOne({ where: { id }, relations: ['client'] });
  
    if (!review) {
      throw new NotFoundException('Review not found');
    }
  
    if (review.client.id !== clientId) {
      throw new ForbiddenException('You can only delete your own reviews');
    }
  
    await this.reviewRepo.remove(review);
  }
  

async getReviewsForProvider(providerId: number) {
    return this.reviewRepo.find({
      where: { provider: { id: providerId } },
      relations: ['client'],
    });
  }
  
}
