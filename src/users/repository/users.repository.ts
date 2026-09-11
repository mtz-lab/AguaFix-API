import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userOrmRepository: Repository<User>,
  ) {}

  create(partial: Partial<User>): User {
    return this.userOrmRepository.create(partial);
  }

  save(user: User): Promise<User> {
    return this.userOrmRepository.save(user);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userOrmRepository.findOne({ where: { email } });
  }
}
