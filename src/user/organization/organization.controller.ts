import { Body, Controller, Post } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CommonController } from '../../common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiNeedLoginDecorator, Uid } from '../../decorators';
import { UserJoinQuiteOrganizationDto } from '../dto/user-join-quite-organization.dto';

@Controller('/organization')
export class OrganizationController extends CommonController {
  constructor(private organizationService: OrganizationService) {
    super();
  }

  @ApiTags('用户相关')
  @ApiOperation({ description: '用户加入组织接口' })
  @ApiNeedLoginDecorator()
  @Post('/member')
  async userJoinOrganization(
    @Body() userJoinQuiteOrganizationDto: UserJoinQuiteOrganizationDto,
    @Uid() uid: number,
  ) {
    console.log(uid);
    try {
      await this.organizationService.userJoinOrganization(
        uid,
        userJoinQuiteOrganizationDto,
      );
      return this.success('ok');
    } catch (e) {
      return this.fail(e);
    }
  }
}
