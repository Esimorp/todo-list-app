import { Controller } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CommonController } from '../../common';

@Controller('/organization')
export class OrganizationController extends CommonController {
  constructor(private userService: OrganizationService) {
    super();
  }
}
