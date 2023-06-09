import { BadRequestException, Injectable } from '@nestjs/common';
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

  public async userJoinOrganization(uid: number, organizationId: number) {
    const organization = await this.organizationRepo.findOne({
      where: {
        id: organizationId,
      },
      relations: { members: true },
    });
    if (!organization) {
      throw new BadRequestException(
        await this.i18n.t('errors.ORGANIZATION_NOT_EXISTED'),
      );
    }

    if (organization.members.some((member) => member.id === uid)) {
      throw new BadRequestException(
        await this.i18n.t('errors.USER_ALREADY_IN_ORGANIZATION'),
      );
    }
    organization.members.push({ id: uid } as User);
    await this.organizationRepo.save(organization);
  }
}
