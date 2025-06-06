import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(userData: Partial<User>) {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
