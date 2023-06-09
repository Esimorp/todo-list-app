import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindPageDto {
  /**
   * 每页数量
   * @example 12
   */
  @IsNumber()
  @IsNotEmpty()
  pageSize: number;

  /**
   * 页码
   * @example 0
   */
  @IsNumber()
  @IsNotEmpty()
  pageIndex: number;
}
