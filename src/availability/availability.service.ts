import {
    BadRequestException,
    Injectable,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, LessThanOrEqual, MoreThanOrEqual, Not } from 'typeorm';
  import { Availability } from './availability.entity';
  import { User } from '../users/user.entity';
  import { UpdateAvailabilityDto } from './dto/update-availability.dto';
  import { CreateAvailabilityDto } from './dto/create-availability.dto';
  import { UsersService } from 'src/users/users.service';

  @Injectable()
  export class AvailabilityService {
    constructor(
      @InjectRepository(Availability)
      private availabilityRepo: Repository<Availability>,
      private usersService: UsersService,
    ) {}
  
    // Create a new availability slot
    async createAvailability(dto: CreateAvailabilityDto, userId: number, provider: User) {
      const availability = this.availabilityRepo.create({
        start: dto.start,
        end: dto.end,
        provider: provider,
      });
  
      // Check if the new time slot overlaps with existing availability
      const conflictingAvailability = await this.availabilityRepo.findOne({
        where: {
          provider: { id: provider.id },
          start: LessThanOrEqual(dto.end ? new Date(dto.end) : new Date(0)),
          end: MoreThanOrEqual(dto.start ? new Date(dto.start) : new Date(0)),
        },
      });
  
      if (conflictingAvailability) {
        throw new BadRequestException('The provider is already unavailable during this time.');
      }
  
      return await this.availabilityRepo.save(availability);
    }
  
    // Get all availability slots for a provider
    async findAllForProvider(providerId: number) {
      return this.availabilityRepo.find({
        where: { provider: { id: providerId } },
      });
    }
  
    // Update an existing availability slot
    async updateAvailability(id: number, dto: UpdateAvailabilityDto, providerId: number) {
      const availability = await this.availabilityRepo.findOne({ where: { id }, relations: ['provider'] });
  
      if (!availability || availability.provider.id !== providerId) {
        throw new BadRequestException('Availability slot not found or you are not the provider');
      }
  
      // Check for conflicts before updating (excluding the current slot)
      const conflictingAvailability = await this.availabilityRepo.findOne({
        where: {
          provider: { id: providerId },
          start: LessThanOrEqual(dto.end ? new Date(dto.end) : new Date(0)),
          end: MoreThanOrEqual(dto.start ? new Date(dto.start) : new Date(0)),
          id: Not(id),
        },
      });
  
      if (conflictingAvailability) {
        throw new BadRequestException('The provider is already unavailable during this time.');
      }
  
      if (dto.start) availability.start = new Date(dto.start);
      if (dto.end) availability.end = new Date(dto.end);


      return this.availabilityRepo.save(availability);
    }
  
    // Remove an existing availability slot
    async removeAvailability(id: number, providerId: number) {
      const availability = await this.availabilityRepo.findOne({ where: { id }, relations: ['provider'] });
  
      if (!availability || availability.provider.id !== providerId) {
        throw new BadRequestException('Availability slot not found or you are not the provider');
      }
  
      await this.availabilityRepo.remove(availability);
      return { message: 'Availability slot deleted successfully' };
    }


async isProviderAvailable(providerId: number, requestedTime: Date): Promise<boolean> {
  const availability = await this.availabilityRepo.findOne({
    where: {
      provider: { id: providerId },
      start: LessThanOrEqual(requestedTime),
      end: MoreThanOrEqual(requestedTime),
    },
  });

  return !!availability;
}

  }
  