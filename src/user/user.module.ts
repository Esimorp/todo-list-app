import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { Organization } from './entities/organization.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserRepo } from './repositories/user.repo';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Organization])],
  controllers: [UserController],
  providers: [UserService, UserRepo, ConfigService, JwtService],
})
export class UserModule {}
