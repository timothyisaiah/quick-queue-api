// src/availability/availability.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Availability } from './availability.entity';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Availability]), UsersModule],
  providers: [AvailabilityService],
  controllers: [AvailabilityController],
  exports: [AvailabilityService], // Also export TypeOrmModule if needed
})
export class AvailabilityModule {}
