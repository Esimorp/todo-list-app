import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { Organization } from './entities/organization.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserRepo } from './repositories/user.repo';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OrganizationService } from './organization/organization.service';
import { OrganizationRepo } from './repositories/organization.repo';
import { OrganizationController } from './organization/organization.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Organization])],
  controllers: [UserController, OrganizationController],
  providers: [
    UserService,
    UserRepo,
    ConfigService,
    JwtService,
    OrganizationService,
    OrganizationRepo,
  ],
  exports: [UserService, UserRepo, OrganizationService],
})
export class UserModule {}
