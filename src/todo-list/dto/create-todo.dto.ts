import { IsDate, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateTodoDto {
  /**
   * 任务标题
   * @example title1
   */
  @IsNotEmpty()
  @MaxLength(200)
  @MinLength(1)
  title: string;
  /**
   * 任务截止日期
   */
  @IsDate()
  @Type(() => Date)
  @Transform((value) => value.valueOf(), { toPlainOnly: true })
  deadline: Date;

  @MinLength(1)
  @MaxLength(2000)
  /**
   * 任务描述
   * @example 描述描述描述描述
   */
  description: string;
}
