import { IsDate, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

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
  deadline: Date;

  @MinLength(1)
  @MaxLength(2000)
  /**
   * 任务描述
   * @example 描述描述描述描述
   */
  description: string;
}
