import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: 'pending' | 'accepted' | 'rejected';

  @Column({ type: 'timestamptz' })
  time: Date; // You can change this to Date later if needed

  @ManyToOne(() => User, user => user.clientAppointments)
  client: User;

  @ManyToOne(() => User, user => user.providerAppointments)
  provider: User;
}
