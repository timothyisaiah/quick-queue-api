import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(data: Partial<User>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }
  
  async updateUser(userId: number, updateData: Partial<User>) {
    const qb = this.repo.createQueryBuilder();

    qb.update(User)
      .set(updateData) // Ensure you're passing the updated values here
      .where("id = :id", { id: userId })
      .execute();
  }
}
