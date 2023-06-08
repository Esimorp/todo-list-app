import { CommonRepository } from '../../common';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Organization } from '../entities/organization.entity';

@Injectable()
export class OrganizationRepo extends CommonRepository<Organization> {
  constructor(public dataSource: DataSource) {
    super(Organization, dataSource.createEntityManager());
  }
}
