import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { TodoOrder } from '../entities';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindTodoDto {
  /**
   * 排序
   */
  @IsEnum(TodoOrder)
  order: TodoOrder;

  /**
   * 最早创建日期
   */
  @IsDate()
  @IsOptional()
  @ApiPropertyOptional()
  @Type(() => Date)
  @Transform((value) => value.valueOf(), { toPlainOnly: true })
  startAt: Date;
  /**
   * 最晚创建日期
   */
  @IsDate()
  @IsOptional()
  @ApiPropertyOptional()
  @Type(() => Date)
  @Transform((value) => value.valueOf(), { toPlainOnly: true })
  endAt: Date;
  /**
   * 创建者id
   */
  @IsNumber()
  @ApiPropertyOptional()
  @IsOptional()
  ownerId: number;
}
