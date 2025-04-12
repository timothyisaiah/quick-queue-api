import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Availability {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.availabilities, { onDelete: 'CASCADE' })
  provider: User;

  @Column({ type: 'timestamptz' })
  start: Date;

  @Column({ type: 'timestamptz' })
  end: Date;
}
