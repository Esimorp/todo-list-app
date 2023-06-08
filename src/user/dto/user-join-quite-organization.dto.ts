import { IsNumber } from 'class-validator';

export class UserJoinQuiteOrganizationDto {
  /**
   * 组织id
   * @example 1
   */
  @IsNumber()
  organizationId: number;
}
