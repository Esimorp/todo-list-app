import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../entities';
import { OrganizationRepo } from '../repositories/organization.repo';
import { Organization } from '../entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(private organizationRepo: OrganizationRepo) {}

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
      throw new BadRequestException('errors.ORGANIZATION_NOT_EXISTED');
    }

    if (organization.members.some((member) => member.id === uid)) {
      throw new BadRequestException('errors.USER_ALREADY_IN_ORGANIZATION');
    }
    organization.members.push({ id: uid } as User);
    await this.organizationRepo.save(organization);
  }

  public async isUserInOrganization(uid, organizationId) {
    const organization = await this.organizationRepo.findOne({
      where: {
        id: organizationId,
      },
      relations: { members: true },
    });
    if (!organization) {
      throw new BadRequestException('errors.ORGANIZATION_NOT_EXISTED');
    }
    return organization.members.some((member) => member.id === uid);
  }
}
