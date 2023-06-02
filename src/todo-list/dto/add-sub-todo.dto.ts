import { CreateTodoDto } from './create-todo.dto';
import { IsNumber } from 'class-validator';

export class AddSubTodoDto extends CreateTodoDto {
  @IsNumber()
  /**
   * 父级Todo的Id
   * @example 2
   */
  parentId: number;
}
