import { Injectable } from '@nestjs/common';
import { User } from '../entities';
import { I18nService } from 'nestjs-i18n';
import { OrganizationRepo } from '../repositories/organization.repo';
import { Organization } from '../entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    private organizationRepo: OrganizationRepo,
    private readonly i18n: I18nService,
  ) {}

  public createUserDefaultOrganizationObject(user: User) {
    const organization = new Organization();
    organization.name = user.username;
    organization.owner = user;
    organization.members = [user];
    return organization;
  }
}
