import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { Organization } from './entities/organization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Organization])],
})
export class UserModule {}
