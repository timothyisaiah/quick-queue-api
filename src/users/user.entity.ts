import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from '../appointments/appointment.entity';
import { Notification } from '../notifications/notification.entity';
import { Availability } from 'src/availability/availability.entity';
import { Review } from 'src/reviews/review.entity';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role: 'client' | 'provider';

    @OneToMany(() => Appointment, appt => appt.client)
    clientAppointments: Appointment[];

    @OneToMany(() => Appointment, appt => appt.provider)
    providerAppointments: Appointment[];

    @OneToMany(() => Notification, (notification) => notification.user)
    notifications: Notification[];

    @OneToMany(() => Availability, (availability) => availability.provider)
    availabilities: Availability[];

    @OneToMany(() => Review, review => review.client)
    reviewsWritten: Review[];

    @OneToMany(() => Review, review => review.provider)
    reviewsReceived: Review[];

}
