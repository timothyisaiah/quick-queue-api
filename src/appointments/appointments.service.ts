import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { UsersService } from '../users/users.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { AvailabilityService } from 'src/availability/availability.service';
import { Availability } from 'src/availability/availability.entity';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectRepository(Appointment)
        private appointmentRepo: Repository<Appointment>,
      
        @InjectRepository(Availability)
        private availabilityRepo: Repository<Availability>,
      
        private usersService: UsersService,
        private notificationsService: NotificationsService,
        private availabilityService: AvailabilityService,
      ) {}
      

    // New service method signature
    async requestAppointment(body: any, user: any) {
        const { providerId, availabilityId } = body;

        const provider = await this.usersService.findOne(providerId);
        if (!provider || provider.role !== 'provider') {
            throw new BadRequestException('Invalid provider');
        }

        const client = await this.usersService.findOne(user.id);
        if (!client) {
            throw new BadRequestException('Invalid client');
        }

        // 👇 Fetch availability slot
        const availability = await this.availabilityRepo.findOne({
            where: { id: availabilityId },
        });

        if (!availability) {
            throw new BadRequestException('Invalid availability slot');
        }

        const requestedTime = availability.start;

        const isAvailable = await this.availabilityService.isProviderAvailable(
            providerId,
            requestedTime
        );

        if (!isAvailable) {
            throw new BadRequestException('Provider is not available at that time');
        }

        const clientConflict = await this.appointmentRepo.findOne({
            where: {
                client: { id: client.id },
                time: requestedTime,
            },
        });

        const providerConflict = await this.appointmentRepo.findOne({
            where: {
                provider: { id: provider.id },
                time: requestedTime,
            },
        });

        if (clientConflict || providerConflict) {
            throw new BadRequestException('Time slot already booked');
        }

        const appointment = this.appointmentRepo.create({
            client,
            provider,
            time: requestedTime,
            status: 'pending',
        });

        await this.notificationsService.notify(
            provider,
            `${user.email} requested an appointment at ${requestedTime.toLocaleString()}`
        );

        return this.appointmentRepo.save(appointment);
    }




    async getAppointments(user: any) {
        if (user.role === 'client') {
            return this.appointmentRepo.find({
                where: { client: { id: user.id } },
                relations: ['provider'],
            });
        }

        if (user.role === 'provider') {
            return this.appointmentRepo.find({
                where: { provider: { id: user.id } },
                relations: ['client'],
            });
        }

        return [];
    }

    async updateStatus(id: number, action: string, providerId: number) {
        const appointment = await this.appointmentRepo.findOne({
            where: { id },
            relations: ['provider'],
        });

        if (!appointment) {
            throw new NotFoundException('Appointment not found');
        }

        if (appointment.provider.id !== providerId) {
            throw new BadRequestException('Not your appointment');
        }

        if (!['accept', 'reject'].includes(action)) {
            throw new BadRequestException('Invalid action');
        }

        if (action === 'accept') {
            const conflict = await this.appointmentRepo.findOne({
                where: {
                    provider: { id: appointment.provider.id },
                    time: appointment.time,
                    status: 'accepted',
                },
            });

            if (conflict && conflict.id !== appointment.id) {
                throw new BadRequestException('Provider already has an accepted appointment at this time');
            }
        }

        await this.notificationsService.notify(
            appointment.client,
            `Your appointment was ${action === 'accept' ? 'accepted' : 'rejected'} by ${appointment.provider.name}`
        );

        appointment.status = action === 'accept' ? 'accepted' : 'rejected';
        return this.appointmentRepo.save(appointment);
    }


}
