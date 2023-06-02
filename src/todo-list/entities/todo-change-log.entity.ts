import { CommonEntity } from '../../common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../user/entities';
import { Todo } from './todo.entity';

@Entity()
export class TodoChangeLog extends CommonEntity {
  @ManyToOne(() => Todo, (todo) => todo.changeLogs)
  todo: Todo;
  @Column({ comment: '动作' })
  action: number;
  @Column({ comment: '载荷', nullable: true })
  payload: string;

  /**
   * 操作者
   */
  @ManyToOne(() => User, (user) => user.ownedTodos, { eager: true })
  operator: User;
}

export enum TodoChangeAction {
  CREATE_TODO = 0,
  CREATE_SUB_TODO = 1,
  UPDATE_TODO_TITLE = 2,
  UPDATE_TODO_DESCRIPTION = 3,
  FINISH_TODO = 4,
  //and so on
}
