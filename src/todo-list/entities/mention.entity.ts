import { CommonEntity } from '../../common';
import { Entity, ManyToOne } from 'typeorm';
import { User } from '../../user/entities';
import { Todo } from './todo.entity';

@Entity()
export class Mention extends CommonEntity {
  /**
   * 作者
   */
  @ManyToOne(() => User)
  author: User;
  /**
   * 提及的人
   */
  @ManyToOne(() => User)
  targetUser: User;
  /**
   * 所属Todo
   */
  @ManyToOne(() => Todo)
  todo: Todo;
}
