import { IsNumber } from 'class-validator';

export class FindPageDto {
  @IsNumber()
  pageSize: number;
  @IsNumber()
  pageIndex: number;
}
