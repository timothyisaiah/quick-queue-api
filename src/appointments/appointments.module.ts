import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './appointment.entity';
import { UsersModule } from '../users/users.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { AvailabilityModule } from 'src/availability/availability.module';
import { Availability } from 'src/availability/availability.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, Availability]), 
    UsersModule,
    NotificationsModule,
    AvailabilityModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
