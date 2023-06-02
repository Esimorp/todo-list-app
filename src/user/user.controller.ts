import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { Repository } from 'typeorm';

@Controller()
export class UserController {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  @Get('/init-user')
  async initUser() {
    await this.userRepository.save({
      id: 1,
    });
    return 'ok';
  }
}
