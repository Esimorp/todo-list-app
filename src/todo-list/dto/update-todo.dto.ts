import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTodoDto {
  /**
   * 要修改的Todo的 id
   * @example 1
   */
  @IsNotEmpty()
  @IsNumber()
  id: number;

  /**
   * 新标题
   * @example new title
   */
  @MaxLength(200)
  @MinLength(1)
  @IsOptional()
  @ApiPropertyOptional()
  title: string;
  /**
   * 新的截止日期
   */
  @IsDate()
  @Type(() => Date)
  @Transform((value) => value.valueOf(), { toPlainOnly: true })
  @IsOptional()
  @ApiPropertyOptional()
  deadline: Date;

  /**
   * 新的描述
   * @example 描述描述描述
   */
  @MinLength(1)
  @MaxLength(2000)
  @IsOptional()
  @ApiPropertyOptional()
  description: string;

  @IsBoolean()
  @ApiPropertyOptional()
  @IsOptional()
  /**
   * 是否已经完成
   * @example true
   */
  finished: boolean;
}
