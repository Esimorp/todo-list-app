import { Controller, Param, Post } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CommonController } from '../../common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiNeedLoginDecorator, Uid } from '../../decorators';

@Controller('/organization')
export class OrganizationController extends CommonController {
  constructor(private organizationService: OrganizationService) {
    super();
  }

  @ApiTags('用户相关')
  @ApiOperation({ description: '用户加入组织接口' })
  @ApiNeedLoginDecorator()
  @ApiParam({
    name: 'organizationId',
    description: '要加入的组织的id',
    example: 1,
  })
  @Post('/:organizationId/member')
  async userJoinOrganization(
    @Param('organizationId') organizationId,
    @Uid() uid: number,
  ) {
    try {
      await this.organizationService.userJoinOrganization(uid, organizationId);
      return this.success('ok');
    } catch (e) {
      return this.fail(e);
    }
  }
}
