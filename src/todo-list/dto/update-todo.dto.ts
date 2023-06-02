import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty()
  @IsNumber()
  /**
   * 要修改的Todo的 id
   * @example 1
   */
  id: number;
  @MaxLength(200)
  @MinLength(1)
  /**
   * 新标题
   * @example new title
   */
  title: string;
  @IsDate()
  /**
   * 新的截止日期
   */
  deadline: Date;
  @MinLength(1)
  @MaxLength(2000)
  /**
   * 新的描述
   * @example 描述描述描述
   */
  description: string;
  /**
   * 是否已经完成
   * @example true
   */
  @IsBoolean()
  finished: boolean;
}
